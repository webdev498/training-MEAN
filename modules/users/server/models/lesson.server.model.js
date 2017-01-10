'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LessonSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  courseId : {
    type: String
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  videos : [{
    videoname: {
      type: String,
      trim: true
    },
    videourl: {
      type: String,
      trim: true
    },
    questionType: {
      type: String,
      trim: true
    },
    question: {
      type: String,
      trim: true
    },
    correctAnswer: {
      type: String,
      trim: true
    },    
    answerList: {
      A: {
        type: String
      },
      B: {
        type: String
      },
      C: {
        type: String
      },
    }
  }]
});

mongoose.model('Lesson', LessonSchema);
