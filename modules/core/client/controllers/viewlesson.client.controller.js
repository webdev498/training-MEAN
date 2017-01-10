'use strict';

angular.module('core').controller('ViewLessonController', ['$scope', '$state', '$http', '$location', '$timeout', '$q', 'Authentication',
  function ($scope, $state, $http, $location, $timeout, $q, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication.user;

    if($scope.authentication._id === undefined){
      $location.path('/authentication/signin');
    }

    var lessonID = $state.params.lessonID;
    $http.get('/api/lessons/getByLessonID/' + lessonID).success(function (lesson) {
      $scope.lesson = lesson;
      $http.get('/api/lessondetails/get/' + lessonID).success(function (lessondetail) {
        $scope.lessondetail = lessondetail;
      });
    });

    $scope.back = function () {
      $state.go($state.previous.state.name || 'student-home', $state.previous.params);
    };

    $scope.next = function () {
      $location.path('/lesson-question/' + $state.params.courseID + '/' + $state.params.lessonID);
    };
  }]);
