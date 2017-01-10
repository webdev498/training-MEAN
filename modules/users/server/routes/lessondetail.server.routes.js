'use strict';

module.exports = function (app) {
  // User Routes
  var lessondetails = require('../controllers/lessondetails.server.controller');
  // Setting up the users profile api
  app.route('/api/lessondetails/create').post(lessondetails.create);
  app.route('/api/lessondetails/update').put(lessondetails.update);
  app.route('/api/lessondetails/get/:lesson_id').get(lessondetails.get);
};
