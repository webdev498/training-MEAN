'use strict';

angular.module('core').controller('AdminController', ['$scope', '$state', '$http', '$location', '$timeout', '$q', 'Authentication',
  function ($scope, $state, $http, $location, $timeout, $q, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication.user;

    if($scope.authentication._id === undefined){
      $location.path('/authentication/signin');
    }

    $scope.tabIndex = 1 ;

    $scope.lessonsArray = [];
    $scope.checked_course = 0;
    $scope.enrolledStudentsCountArray = [];

    var arr = [];

    $http.get('/api/courses/allCourses').success(function(response) {
      for(var i = 0 ; i < response.length ; i++){
        arr.push($http.get('/api/lessons/get/' + response[i]._id));
      }

      $q.all(arr).then(function(ret){
        for(var index = 0 ; index < ret.length; index++){
          $scope.lessonsArray.push(ret[index].data);
        }
      }).finally(function() {
        $scope.courses = response;
      });
    });

    $http.get('/api/users/allTutors').success(function(response) {
      $scope.tutors = response;
    });

    $http.get('/api/coursedetails/getAll').success(function (response) {
      for(var i = 0 ; i < response.length; i++){
        var count = 0 ;
        for(var j = 0; j < response[i].students.length; j++){
          if(response[i].students[j].status === 'progress'){
            count = count + 1;
          }
        }
        $scope.enrolledStudentsCountArray.push(count);
      }
    });

    $scope.getLessonsCount = function(index) {
      var lessonsCount = $scope.lessonsArray[index].length;
      return lessonsCount;
    };

    $scope.getVideosCount = function(index) {
      var videosCount = 0;
      var lesson = $scope.lessonsArray[index];
      for(var i = 0 ; i< lesson.length; i++){
        videosCount += lesson[i].videos.length;
      }
      return videosCount;
    };

    $scope.getEnrolledStudentsCount = function(index) {
      return $scope.enrolledStudentsCountArray[index];
    };

    $scope.editCourse = function(courseId) {
      $location.path('/edit-course/' + courseId);
    };

    $scope.editOrganization = function(organization_id) {
      $location.path('/edit-organization/' + organization_id);
    };

  }]);
