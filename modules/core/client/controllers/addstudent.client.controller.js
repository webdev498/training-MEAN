'use strict';

angular.module('users').controller('AddStudentController', ['$scope', '$state', '$http', '$timeout', '$location', 'Authentication',
  function ($scope, $state, $http, $timeout, $location, Authentication) {

    if(Authentication.user._id === undefined){
      $location.path('/authentication/signin');
    }

    $scope.student = {};
    var tutor_id = Authentication.user._id;

    $('#dob').datepicker();

    $('#firstName , #lastName').on('blur',function() {
      var firstName = $('#firstName').val();
      var lastName = $('#lastName').val();

      var username = firstName[0] + lastName + lastName.length + firstName.length;
      var date = new Date();
      $scope.student.email = username + date.getTime() + '@gmail.com';
      $scope.student.username = username.toLowerCase();
      $scope.student.password = username.toLowerCase() + 'ABC!@#';
    });

    $scope.addStudent = function (isValid) {

      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      } 
      
      $scope.student.roles = 'student';
      $scope.student.signupPosition = 'student';
      $scope.student.rawPassword = angular.copy($scope.student.password);
      $scope.student.dob = $('#dob').val();

      $http.post('/api/auth/signup', $scope.student).success(function (response) {

        delete $scope.student.roles;
        $scope.student.tutor = tutor_id;

        $http.post('/api/students/create', $scope.student).success(function(res) {
          $state.go($state.previous.state.name || 'tutor-home', $state.previous.params);
        }).error(function(errorRes) {
          $scope.error = errorRes.message;
        });
        
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    $scope.back = function () {
      $location.path('/tutor-home');
    };
  }
]);
