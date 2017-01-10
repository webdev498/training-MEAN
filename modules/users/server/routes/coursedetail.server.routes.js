'use strict';

module.exports = function (app) {
  // User Routes
  var coursedetails = require('../controllers/coursedetails.server.controller');
  // Setting up the users profile api
  app.route('/api/coursedetails/create').post(coursedetails.create);
  app.route('/api/coursedetails/update').put(coursedetails.update);
  app.route('/api/coursedetails/getAll').get(coursedetails.getAll);
};
