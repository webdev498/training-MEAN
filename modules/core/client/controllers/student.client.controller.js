'use strict';

angular.module('core').controller('StudentsController', ['$scope', '$state', '$http', '$location', '$timeout', '$q', 'Authentication',
  function ($scope, $state, $http, $location, $timeout, $q, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication.user;

    if($scope.authentication._id === undefined){
      $location.path('/authentication/signin');
    }

    var username = $scope.authentication.username;
    var activeCourses = [];
    var archivedCourses = [];
    $scope.activeCourses = [];
    $scope.archivedCourses = [];

    $http.get('/api/students/getByUsername/' + username).success(function (student) {
      $http.get('/api/courses/allCourses').success(function (res) {
        $scope.courses = res;
        $http.get('/api/coursedetails/getAll').success(function (response) {
          $scope.coursedetails = response;

          for(var i = 0 ; i <response.length ; i++) {
            for(var k = 0 ; k < response[i].students.length; k++){
              if(response[i].students[k].studentID === student._id){
                var courseID = response[i].courseID;
                if(response[i].students[k].status === 'progress'){
                  activeCourses.push(courseID);
                } else {
                  archivedCourses.push(courseID);
                }
              }
            }
          }

          for(var ii = 0 ; ii < activeCourses.length; ii++){
            for(var jj = 0 ; jj < $scope.courses.length; jj++){
              if($scope.courses[jj]._id === activeCourses[ii]){
                $scope.activeCourses.push($scope.courses[jj]);
              }
            }
          }

          for(var iii = 0 ; iii < archivedCourses.length; iii++){
            for(var jjj = 0 ; jjj< $scope.courses.length; jjj++) {
              if($scope.courses[jjj]._id === archivedCourses[iii]){
                var object = {
                  course: $scope.courses[jjj],
                  status: 'Completed',
                  score: '95',
                  lastActivity: '27-03-2016 15:53:10'
                };

                $scope.archivedCourses.push(object);
              }
            }
          }
        });
      });
    });

    $scope.lessonsPage = function (ID) {
      $location.path('/view-course/' + ID);
    };

  }]);
