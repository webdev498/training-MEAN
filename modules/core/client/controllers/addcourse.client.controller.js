'use strict';

angular.module('core').controller('AddCourseController', ['$scope', '$state', '$http', '$location', '$timeout', '$q', 'Authentication',
  function ($scope, $state, $http, $location, $timeout, $q, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication.user;

    if($scope.authentication._id === undefined){
      $location.path('/authentication/signin');
    }

    $scope.next = function(isValid) {
      $state.go('add-lesson', { course: JSON.stringify($scope.course) });
    };

    $scope.back = function(isValid) {
      $location.path('/admin-home');
    };
  }]);
