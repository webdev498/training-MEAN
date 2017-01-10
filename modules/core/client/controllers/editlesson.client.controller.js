'use strict';

angular.module('core').controller('EditLessonController', ['$scope', '$state', '$http', '$location', '$timeout', '$q', 'Authentication',
  function ($scope, $state, $http, $location, $timeout, $q, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication.user;

    if($scope.authentication._id === undefined){
      $location.path('/authentication/signin');
    }

    $scope.updatingLesson = false;

    $http.get('/api/lessons/getByLessonID/' + $state.params.lessonId).success(function (response) {
      $scope.lesson = response;
      $scope.videos = $scope.lesson.videos;
    });

    $scope.addMoreVideo = function(){
      var new_video = {
        videoname : '',
        videourl : '',
        questionType: '',
        question : 'What Colour is the Sun',
        correctAnswer: '',
        answerList: {
          A: '',
          B: '',
          C: '',
        }
      };

      $scope.videos.push(new_video);
    };

    $scope.back = function() {
      $state.go($state.previous.state.name || 'admin-home', $state.previous.params);
    };

    $scope.removeVideo = function (index) {
      $scope.videos.splice(index,1);  
    };

    $scope.Save = function() {
      $scope.updatingLesson = true;
      $scope.lesson.videos = angular.copy($scope.videos);
      $http.put('/api/lessons/update', $scope.lesson).success(function(res) {
        $scope.updatingLesson = false;
        $timeout(function () {
          $scope.back();
        },100);
      });
    };

    $scope.showQuestions = function () {

      $timeout(function() {

        var objects = $('input[type="radio"]:checked'); 
        
        for(var k = 0 ; k < objects.length ; k++){
          if(objects.eq(k).attr('value') === 'multiple_choice'){
            var index = objects.eq(k).attr('name').split('radio')[1];
            $('.green' + index).hide();
            $('.red' + index).show();
          }

          if(objects.eq(k).attr('value') === 'text_response'){
            var index1 = objects.eq(k).attr('name').split('radio')[1];
            $('.green' + index1).show();
            $('.red' + index1).hide();
          }
        }
        
      },100);
    };

  }])
  .directive('repeatFinished', function() {
    return function(scope, element, attrs) {
      if (scope.$last) {
        scope.$eval(attrs.repeatFinished);
      }
    };
  });
