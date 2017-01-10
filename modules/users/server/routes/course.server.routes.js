'use strict';

module.exports = function (app) {
  // User Routes
  var courses = require('../controllers/courses.server.controller');
  // Setting up the users profile api
  app.route('/api/courses/create').post(courses.create);
  app.route('/api/courses/allCourses').get(courses.getAll);
  app.route('/api/courses/get/:ID').get(courses.getByID);
  app.route('/api/courses/certificate').post(courses.certificate);
  app.route('/api/downloadPDF/:filepath(*)').get(courses.downloadPDF);
};
