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
  pdf = require('html-pdf'),
  options = { 
    format: 'Letter',
    orientation: 'landscape',
    height: '9in',
    width: '12in'
  },
  http = require('http'),
  url = require('url'),
  Course = mongoose.model('Course');
/**
 * Signup
 */
exports.create = function (req, res) {

  var course = new Course(req.body);

  course.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(course);
    }
  });
};

exports.getAll = function (req, res) {
  
  Course.find({ },function(err,courses) {
    if (err) {
      return res.status(400).send({
        message: 'There is an error while getting all courses'
      });
    } else {
      res.json(courses);
    }
  });
};

exports.getByID = function (req, res) {
  Course.findOne({
    _id: req.params.ID
  }, function (err , course) {
    if (err) {
      return res.status(400).send({
        message: 'There is an error while getting all courses'
      });
    } else {
      res.json(course);
    }
  });
};

exports.certificate = function (req, res) {
  res.render(
    path.resolve('modules/users/server/templates/certificate'),
    {
      courseName: req.body.courseName,
      studentName: req.body.studentName,
      percent : req.body.percent,
      lessons: req.body.lessons,
      completedDate: req.body.completedDate,
      courseDescription: req.body.courseDescription
    },
    function (err, html) {
      if(err){
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        var date = new Date().getTime();
        var path = './modules/core/client/certificate' + date + '.pdf';
        pdf.create(html, options).toFile(path, function(err, filename) {
          if (err){
            res.status(400).jsonp(err);
          } else {
            res.jsonp(filename.filename);
          }
        });
      }
    });
};

exports.downloadPDF = function (req, res) {
  res.download(req.params.filepath,'certificate.pdf');  
};