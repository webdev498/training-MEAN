'use strict';

angular.module('users').controller('ResetPasswordSuccessController', ['$scope', '$timeout', '$location', 'Authentication',
  function ($scope, $timeout, $location, Authentication) {
    var response = Authentication.user;
    if(response.roles[0] === 'tutor'){
      $scope.home_url = '/tutor-home';
    } else if(response.roles[0] === 'student') {
      $scope.home_url = '/student-home';
    } else {
      $scope.home_url = '/admin-home';
    }

    $timeout(function(){
      $location.path($scope.home_url);
    },3000);
  }
]);
