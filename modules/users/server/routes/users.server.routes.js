'use strict';

module.exports = function (app) {
  // User Routes
  var users = require('../controllers/users.server.controller');

  // Setting up the users profile api
  app.route('/api/users/me').get(users.me);
  app.route('/api/users').put(users.update);
  app.route('/api/users/update_student_user').put(users.update_student);
  app.route('/api/users/getUserId/:Username').get(users.getUserIdByUsername);
  app.route('/api/users/getTutorById/:userId').get(users.getTutorById);
  app.route('/api/users/accounts').delete(users.removeOAuthProvider);
  app.route('/api/users/removeByUsername/:Username').delete(users.removeByUsername);
  app.route('/api/users/password').post(users.changePassword);
  app.route('/api/users/picture').post(users.changeProfilePicture);
  app.route('/api/users/allTutors').get(users.getAllTutors);
  app.route('/api/users/updateTutor').put(users.updateTutor);
  // Finish by binding the user middleware
  app.param('userId', users.userByID);
};
