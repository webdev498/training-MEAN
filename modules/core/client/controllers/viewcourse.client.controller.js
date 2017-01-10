'use strict';

angular.module('core').controller('ViewCourseController', ['$scope', '$state', '$http', '$location', '$timeout', '$q', 'Authentication',
  function ($scope, $state, $http, $location, $timeout, $q, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication.user;

    if($scope.authentication._id === undefined){
      $location.path('/authentication/signin');
    }
      
    $http.get('/api/courses/get/' + $state.params.courseID).success(function (response) {
      $scope.course = response;
    });

    $http.get('/api/students/getByUsername/' + Authentication.user.username).success(function (response) {
      $scope.currentStudent = response;
    });

    $http.get('/api/lessons/get/' + $state.params.courseID).success(function (response) {
      $scope.lessons = response;
      var arr = [];
      for(var i = 0; i < $scope.lessons.length; i++){
        arr.push($http.get('/api/lessondetails/get/' + $scope.lessons[i]._id));
      }

      $q.all(arr).then(function (ret) {
        for(var i = 0 ; i < ret.length ; i++){
          for(var j = 0 ; j < ret[i].data.students.length; j++){
            if(ret[i].data.students[j].studentID === $scope.currentStudent._id){
              $scope.lessons[i].lesson_status = ret[i].data.students[j].status;
              $scope.lessons[i].lesson_completedDate = ret[i].data.students[j].completedDate;
              $scope.lessons[i].lesson_current_videoID = ret[i].data.students[j].current_videoID;
              $scope.lessons[i].lesson_current_videoPOS = ret[i].data.students[j].current_videoPOS;
              break;
            }
          }
        }
      });
    });

    $scope.back = function () {
      $state.go($state.previous.state.name || 'student-home', $state.previous.params);  
    };

    $scope.lessonPage = function (id) {
      $location.path('/view-lesson/' + $scope.course._id + '/' + id);
    };

  }]);
