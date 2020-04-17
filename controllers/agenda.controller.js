"use strict";

var mongoLocal = require("mongoose");
var mongoModel = mongoLocal.model("agenda");
var loginModel = mongoLocal.model("loginModel");

require('dotenv').config();
const jwt = require("jsonwebtoken");
var bcrypt = require('bcrypt');
const mySalt = Number.parseInt(process.env.SALT);

module.exports.defaultResponse = function(req, resp){
    resp.send("Welcome");
}

module.exports.list_all_tasks = function(req, res){
      mongoModel.find((err, docs) => {
        if(!err){
            res.json(docs);
        }
        else{
            console.log("error");
        }
    });
}

exports.create_a_task = function(req, res) {
    var new_task = new mongoModel(req.body);
    new_task.save({ writeConcern: { w: "majority" , wtimeout: 5000 }}, function(err, task) {
      if (err)
      {
        res.send("something went wrong during write");
      }
      else {
        res.json(task);
      }
    });
  };
  
  exports.read_a_task = function(req, res) {
    mongoModel.findById(req.params.taskId, function(err, task) {
      if (err){
        res.send("something went wrong during read");
      } else {
        res.json(task);
      }
    });
  };
  
  exports.update_a_task = function(req, res) {
    mongoModel.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
      if (err)
        {
          res.send("something went wrong during update");
        }
        else{
          res.json(task);
        }
    });
  };
  
  exports.delete_a_task = function(req, res) {
    mongoModel.deleteOne({name: req.params.taskId}
    , (err) => {
      if (err){
        res.send("something went wrong during delete");
      } else {
        res.json({ message: 'Task successfully deleted' });
      } 
    });
  };

  module.exports.login = function(req, res){

    const token = req.header("token");

    if(token) {
      res.send("Please insert login information");
    } else if(req.body.name) {
      var loginDoc = loginModel.findOne({name: req.body.name}, (err, doc) => {
        if(!err) {
          bcrypt.compare(req.body.password, doc.password, (error, isMatch) => {
            if(!error && isMatch){
              req.user = "verified";
              var token = jwt.sign(req.body.name, process.env.TOKEN_SECRET);
              res.send(token);
            }
          });
        }
        else {
          res.status(401).send("login failed ");
        }
      });
    }
    else{
      res.send("Provide some data");
    }
  }


  exports.create_a_task_signup = function(req, res) {
    var new_task = new loginModel(req.body);
    var test = require('bcrypt');
    test.hash(req.body.password, mySalt,(error, encr) => {
      if(!error){
        new_task.password = encr;
        new_task.save(function(err, task) {
          if (err)
          {
            res.send("something went wrong during signup");
          }
          else{
            res.json("you are registered");
          }
        });
      }
      else
      {
        res.send(error);
      }
    });
  };

  module.exports.list_all_login = function(req, res){
      loginModel.find(  (err, docs) => {
        if(!err){
            res.json(docs);
        }
        else{
            console.log("error");
        }
    });
  }
