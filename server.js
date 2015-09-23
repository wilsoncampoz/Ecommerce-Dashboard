// set up ========================
var express = require('express');
var app = express();
var path = require("path");
var jsonServer = require("json-server");
var databaseServer = jsonServer.create();
var cors = require("cors");

app.use(cors());

app.use("/", express.static(__dirname));
  var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

app.all('/*', function(req, res) {
    res.sendfile('index.html');
});

databaseServer.use(jsonServer.defaults);
databaseServer.use(jsonServer.router('api/db.json'));
databaseServer.listen(4000);
