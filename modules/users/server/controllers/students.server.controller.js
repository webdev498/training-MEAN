'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  passport = require('passport'),
  formidable = require('formidable'),
  fs = require('fs'),
  _ = require('lodash'),
  Student = mongoose.model('Student');  
/**
 * Signup
 */
exports.signup = function (req, res) {
  // For security measurement we remove the roles from the req.body object
  delete req.body.roles;

  // Init Variables
  var student = new Student(req.body);

  // Then save the student
  student.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(student);
    }
  });
};

exports.getStudentsByTutor = function (req, res) {
  Student.find({
    tutor: req.params.tutorId,
  }, function (err, students) {
    if (!students) {
      return res.status(400).send({
        message: 'There are no students you added'
      });
    } else {
      res.json(students);
    }
  });
};
exports.uploadCSVfile = function(req,res){
  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = './modules/users/client/csvupload';
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, 'student.csv'));
  });
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });
  form.on('end', function() {
    res.end('success');
  });
  form.parse(req);
};
exports.getDataFromCSV = function(req,res){
  var Converter = require('csvtojson').Converter;
  var converter = new Converter({});
  converter.on('end_parsed', function (jsonArray) {
    res.json(jsonArray);
  });

  fs.createReadStream('./modules/users/client/csvupload/student.csv').pipe(converter);
};
exports.removeCSVfile = function(req,res){
  fs.unlink('./modules/users/client/csvupload/student.csv',function(err){
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json('success');
    }
  });
};
exports.removeStudent = function(req,res){
  Student.remove({
    username: req.params.studentUsername,
  }, function (err, student) {
    if (!student) {
      return res.status(400).send({
        message: 'There are no students.'
      });
    } else {
      res.json('Student was successfully removed');
    }
  });
};

exports.updateStudent = function(req,res){

  Student.findOne({
    _id: req.body._id
  }, function(err, student){
    student = _.extend(student, req.body);
    student.updated = Date.now();
    
    student.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(student);
      }
    });
  });
};

exports.getByUsername = function (req, res) {
  Student.findOne({
    username: req.params.username
  }, function(err, student){
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(student);
    }
  });
};

exports.get = function (req, res) {
  Student.findOne({
    _id: req.params.studentID
  }, function(err, student){
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(student);
    }
  });
};