'use strict';

module.exports = function (app) {
  // User Routes
  var lessons = require('../controllers/lessons.server.controller');
  // Setting up the users profile api
  app.route('/api/lessons/create').post(lessons.create);
  app.route('/api/lessons/get/:courseId').get(lessons.getByCourseID);
  app.route('/api/lessons/getByLessonID/:lessonId').get(lessons.getByLessonID);
  app.route('/api/lessons/update').put(lessons.update);
};
