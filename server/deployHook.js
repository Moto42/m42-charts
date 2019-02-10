/*
This is a quick webhook that will pull the new code from a specified repo branch when it recieves a POST from github.
To make this work, you will have to do the following...
  Goto https://github.com/<your username>/<your repo>/settings/hooks/
    Create a new webhook for the PUSH event.
    set the 'content type' to `application/JSON`
    create a SECRET and make it good an secure
  set the following values as environmental variables...
    GIT_SECRET = This should be the same as the SECRET you gave your webhook.
    REPO_BRANCH = This should equal the name of the branch you are pulling from.
*/


const express = require('express');
const crypto = require('crypto');
const exec = require('child_process').exec;
const deployHook = express.Router();

function pullFromMaster(repoUrl) {
  exec(`git checkout -- ./ && git pull -X theirs ${repoUrl} glitch && refresh`);
};

function _post(req,res) {
  const auth = req.headers['x-hub-signature'];
  const sig = "sha1=" + crypto.createHmac('sha1', process.env.GIT_SECRET).update(JSON.stringify(req.body)).digest('hex');
  
  if(
    auth !== sig) res.status(401).send('Not Authorized');
  else {
    if(req.body.ref !== `refs/heads/${process.env.REPO_BRANCH}`) res.status(200).send('Thankyou, but our code is on another branch.');
    else{
      pullFromMaster(req.body.repository.git_url);
      res.status(200).send("Pulling from repo");}
  };
};

//define the home page route.
deployHook.route('/')
  .get(function (req, res) {
    res.status(405).send('GET not allowed to this path.');
  })
  .post(_post)
  .put(function (req, res) {
    res.status(405).send('PUSH not allowed to this path.');
  })
  .delete(function (req, res) {
    res.status(405).send('DELETE not allowed to this path.');
  })
       

module.exports = deployHook;