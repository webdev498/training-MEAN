'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LessonDetail = new Schema({
  lessonID: {
    type: String
  },
  students : [{
    studentID: String,
    status: {
      type:String,
      default: 'assigned'
    },
    completedDate: String,
    current_videoID : String,
    current_videoPOS : String
  }],
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('LessonDetail', LessonDetail);
