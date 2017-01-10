'use strict';

angular.module('core').controller('LessonQuestionController', ['$scope', '$state', '$http', '$location', '$timeout', '$q', 'Authentication',
  function ($scope, $state, $http, $location, $timeout, $q, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication.user;

    if($scope.authentication._id === undefined){
      $location.path('/authentication/signin');
    }

    $http.get('/api/lessons/getByLessonID/' + $state.params.lessonID).success(function (response) {
      $scope.lesson = response;
      console.log(response);  
    });

    $scope.back = function () {
      $state.go($state.previous.state.name || 'student-home', $state.previous.params);
    };

    $scope.next = function () {
      $location.path('/lesson-completed/' + $state.params.courseID + '/' + $state.params.lessonID);  
    };
  }]);
