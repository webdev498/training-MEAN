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
  Lesson = mongoose.model('Lesson');
/**
 * Signup
 */
exports.create = function (req, res) {
  
  var lesson = new Lesson(req.body);

  lesson.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(lesson);
    }
  });
};

exports.getByCourseID = function(req, res) {
  Lesson.find({
    courseId : req.params.courseId
  }, function(err,lesson) {
    if (err) {
      return res.status(400).send({
        message: 'There is an error while getting the lesson'
      });
    } else {
      res.json(lesson);
    }
  });
};

exports.getByLessonID = function(req, res) {
  Lesson.findOne({
    _id : req.params.lessonId
  }, function(err,lesson) {
    if (err) {
      return res.status(400).send({
        message: 'There is an error while getting the lesson'
      });
    } else {
      res.json(lesson);
    }
  });
};

exports.update = function (req, res) {
  var id = req.body._id;
  delete req.body._id;
  var lesson = req.body;
  Lesson.update({ _id: id }, lesson , function(err, updated_lesson){
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(updated_lesson);
    }
  });
};