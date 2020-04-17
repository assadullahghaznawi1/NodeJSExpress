"use strict";
const connection = require("./models");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoLocal = require("mongoose");
const routesLocal = require('./routes/agenda.route');

Object.assign=require('object-assign');


var counter = 0;
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.use(bodyParser.urlencoded({extended : true}));
routesLocal(app);

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;

/*
app.get('/', function (req, res) {
    res.send("it works now");
});

app.listen("3030",(body) => {
    console.log("Server started");
});
*/
// app.engine('html', require('ejs').renderFile);
//app.use(morgan('combined'));
//var morgan  = require('morgan');