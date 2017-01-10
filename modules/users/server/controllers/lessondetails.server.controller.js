'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  LessonDetail = mongoose.model('LessonDetail');
/**
 * Signup
 */
exports.create = function (req, res) {
  
  var lessonDetail = new LessonDetail(req.body);

  lessonDetail.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(lessonDetail);
    }
  });
};

exports.update = function (req, res) {
  var id = req.body._id;
  delete req.body._id;
  var lessonDetail = req.body;
  LessonDetail.update({ _id: id }, lessonDetail , function(err, updated_lessonDetail){
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(updated_lessonDetail);
    }
  });
};

exports.get = function (req, res) {
  var lesson_id = req.params.lesson_id;

  LessonDetail.findOne({
    lessonID: lesson_id
  }, function (err, lessonDetail) {
    if(err){
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else{
      res.json(lessonDetail);
    }
  });
};