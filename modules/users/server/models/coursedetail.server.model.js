'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CourseDetail = new Schema({
  courseID: {
    type: String
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  students : [{
    studentID: String,
    status: String,
    score: Number,
    lastActivity: String,
  }]
});

mongoose.model('CourseDetail', CourseDetail);
