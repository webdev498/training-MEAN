'use strict';

module.exports = function (app) {
	// User Routes
  var students = require('../controllers/students.server.controller');
  // Setting up the users profile api
  app.route('/api/students/create').post(students.signup);
  app.route('/api/studentsByTutor/:tutorId').get(students.getStudentsByTutor);
  app.route('/api/student/uploadCSVfile').post(students.uploadCSVfile);
  app.route('/api/students/getDataFromCSV').get(students.getDataFromCSV);
  app.route('/api/students/removeCSVfile').get(students.removeCSVfile);
  app.route('/api/students/update').put(students.updateStudent);
  app.route('/api/students/getByUsername/:username').get(students.getByUsername);
  app.route('/api/students/get/:studentID').get(students.get);
  app.route('/api/studentsRemoveByUsername/:studentUsername').delete(students.removeStudent);
};
