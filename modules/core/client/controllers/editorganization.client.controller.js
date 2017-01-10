'use strict';

angular.module('core').controller('EditOrganizationController', ['$scope', '$state', '$http', '$location', '$timeout', '$q', 'Authentication',
  function ($scope, $state, $http, $location, $timeout, $q, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication.user;

    if($scope.authentication._id === undefined){
      $location.path('/authentication/signin');
    }
    
    $http.get('/api/users/getTutorById/' + $state.params.organizationId).success(function (response) {
      $scope.tutor = response;
    });

    $scope.updateTutor = function(){
      $scope.tutor.username = angular.copy($scope.tutor.email);
      $scope.tutor.password = angular.copy($scope.tutor.rawPassword);
      $http.put('/api/users/updateTutor', $scope.tutor).success(function (response) {
        $timeout(function() {
          $location.path('/admin-home');
        });
      });
    };

    $scope.back = function () {
      $state.go($state.previous.state.name || 'admin-home', $state.previous.params);
    };

  }]);
