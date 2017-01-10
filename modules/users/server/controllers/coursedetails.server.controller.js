'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  CourseDetail = mongoose.model('CourseDetail');
/**
 * Signup
 */
exports.create = function (req, res) {
  
  var courseDetail = new CourseDetail(req.body);

  courseDetail.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(courseDetail);
    }
  });
};

exports.update = function (req, res) {
  var id = req.body._id;
  delete req.body._id;
  var courseDetail = req.body;
  CourseDetail.update({ _id: id }, courseDetail , function(err, updated_courseDetail){
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(updated_courseDetail);
    }
  });
};

exports.getAll = function (req, res) {
  CourseDetail.find({

  }, function(err, coursedetails){
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(coursedetails);
    }
  });
};