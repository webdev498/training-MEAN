'use strict';

angular.module('core').controller('HomeController', ['$scope', '$location', 'Authentication',
  function ($scope, $location, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    if(Authentication.user){
      if(Authentication.user.roles[0] === 'tutor'){
        $scope.home_url = '/tutor-home';
      } else if(Authentication.user.roles[0] === 'student') {
        $scope.home_url = '/student-home';
      } else {
        $scope.home_url = '/admin-home';
      }
      $location.path($scope.home_url);
    } else {
      $location.path('/authentication/signin');
    }
  }]);
