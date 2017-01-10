'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
    .state('home', {
      url: '/',
      controller: 'HomeController'
    })
    .state('not-found', {
      url: '/not-found',
      templateUrl: 'modules/core/client/views/404.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('bad-request', {
      url: '/bad-request',
      templateUrl: 'modules/core/client/views/400.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'modules/core/client/views/403.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('admin-home',{
      url: '/admin-home',
      templateUrl: 'modules/core/client/views/admin-home.view.html'
    })
    .state('tutor-home', {
      url: '/tutor-home',
      templateUrl: 'modules/core/client/views/tutor-home.view.html'
    })
    .state('student-home', {
      url: '/student-home',
      templateUrl: 'modules/core/client/views/student-home.view.html'
    })
    .state('add-student',{
      url: '/add-student',
      templateUrl: 'modules/core/client/views/add-student.view.html'
    })
    .state('add-course',{
      url: '/add-course',
      templateUrl: 'modules/core/client/views/add-course.view.html'
    })
    .state('edit-course',{
      url: '/edit-course/:courseId',
      templateUrl: 'modules/core/client/views/edit-course.view.html'
    })
    .state('add-lesson',{
      url: '/add-lesson/{course}',
      templateUrl: 'modules/core/client/views/add-lesson.view.html'
    })
    .state('edit-lesson',{
      url: '/edit-lesson/:lessonId',
      templateUrl: 'modules/core/client/views/edit-lesson.view.html'
    })
    .state('add-organization',{
      url: '/add-organization',
      templateUrl: 'modules/core/client/views/add-organization.view.html'
    })
    .state('edit-organization',{
      url: '/edit-organization/:organizationId',
      templateUrl: 'modules/core/client/views/edit-organization.view.html'
    })
    .state('student-detail',{
      url: '/student-detail/:studentID',
      templateUrl: 'modules/core/client/views/student-detail.view.html'
    })
    .state('view-course',{
      url: '/view-course/:courseID',
      templateUrl: 'modules/core/client/views/view-course.view.html'
    })
    .state('view-lesson',{
      url: '/view-lesson/:courseID/:lessonID',
      templateUrl: 'modules/core/client/views/view-lesson.view.html'
    })
    .state('lesson-question',{
      url: '/lesson-question/:courseID/:lessonID',
      templateUrl: 'modules/core/client/views/lesson-question.view.html'
    })
    .state('lesson-completed',{
      url: '/lesson-completed/:courseID/:lessonID',
      templateUrl: 'modules/core/client/views/lesson-completed.view.html'
    });
  }
]);
