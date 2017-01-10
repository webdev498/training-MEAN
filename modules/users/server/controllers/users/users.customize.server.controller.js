'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/*
********************** Get All Tutors *******************
*/

exports.getAllTutors = function (req, res) {
  User.find({
    roles: 'tutor'
  }, function (err , tutors) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(tutors);
    }
  });
};

exports.getTutorById = function (req, res) {
  User.findOne({
    _id: req.params.userId
  }, function (err , tutor) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(tutor);
    }
  });
};

exports.updateTutor = function (req, res) {
  var id = req.body._id;
  delete req.body._id;
  var user = req.body;
  User.update({ _id: id }, user , function(err, update_tutor){
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(update_tutor);
    }
  });
};