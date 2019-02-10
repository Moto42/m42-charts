// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const deployHook = require('./server/deployHook');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

app.use('/deployhook', deployHook);

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
app.listen(
  process.env.PORT,
  function () {
    console.log('Your app is listening on port ' + process.env.PORT);
  }
);

module.exports = app;
