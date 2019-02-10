const express = require('express');
const crypto = require('crypto');
const exec = require('child_process').exec;
const deployHook = express.Router();

function pullFromMaster() {
  const repo = "~/moto42/m42-charts/";
  exec('cd ' + repo + ' && git pull');
};

function _post(req,res) {
  const auth = req.headers['x-hub-signature'];
  const sig = "sha1=" + crypto.createHmac('sha1', process.env.SECRET).update(JSON.stringify(req.body)).digest('hex');
  
  if(auth !== sig) res.status(401).send('Not Authorized');
  else {
    pullFromMaster();
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