'use strict';

angular.module('core').controller('LessonCompletedController', ['$scope', '$state', '$http', '$location', '$timeout', '$q', 'Authentication',
  function ($scope, $state, $http, $location, $timeout, $q, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication.user;

    if($scope.authentication._id === undefined){
      $location.path('/authentication/signin');
    }

    $scope.finish = function () {
      $location.path('/view-course/' + $state.params.courseID);
    };
  }]);
