'use strict';

angular.module('core').controller('EditCourseController', ['$scope', '$state', '$http', '$location', '$timeout', '$q', 'Authentication',
  function ($scope, $state, $http, $location, $timeout, $q, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication.user;

    if($scope.authentication._id === undefined){
      $location.path('/authentication/signin');
    }

    $http.get('/api/courses/get/' + $state.params.courseId).success(function (response) {
      $scope.courseDetail = response;
    });

    $http.get('/api/lessons/get/' + $state.params.courseId).success(function (response) {
      $scope.lessons = response;
    });

    $scope.addLesson = function() {
      var courseDetail = {
        name : $scope.courseDetail.name,
        description : $scope.courseDetail.description,
        courseId : $scope.courseDetail._id
      };

      $state.go('add-lesson', { course: JSON.stringify(courseDetail) });
    };

    $scope.editLesson = function() {
      var index = $('input[name="selected_lesson"]:checked').attr('value');
      var lessonId = $scope.lessons[index]._id;
      $location.path('/edit-lesson/' + lessonId);
    };

  }]);
