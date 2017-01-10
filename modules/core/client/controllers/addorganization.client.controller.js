'use strict';

angular.module('core').controller('AddOrganizationController', ['$scope', '$state', '$http', '$location', '$timeout', '$q', 'Authentication',
  function ($scope, $state, $http, $location, $timeout, $q, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication.user;

    if($scope.authentication._id === undefined){
      $location.path('/authentication/signin');
    }

    $scope.addTutor = function(isValid){
      $scope.error = '';
      $scope.tutor.username = angular.copy($scope.tutor.email);
      $scope.tutor.roles = 'tutor';
      $scope.tutor.rawPassword = angular.copy($scope.tutor.password);
      $scope.signupPosition = 'student';

      $http.post('/api/auth/signup', $scope.tutor).success(function (response) {
        $timeout(function() {
          $location.path('/admin-home');
        });
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    $scope.back = function () {
      $state.go($state.previous.state.name || 'admin-home', $state.previous.params);
    };

  }]);
