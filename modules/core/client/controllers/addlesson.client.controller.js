'use strict';

angular.module('core').controller('AddLessonController', ['$scope', '$state', '$http', '$location', '$timeout', '$q', 'Authentication',
  function ($scope, $state, $http, $location, $timeout, $q, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication.user;

    if($scope.authentication._id === undefined){
      $location.path('/authentication/signin');
    }

    $scope.addingCourseandLessons = false;
    $scope.courseAlreadyCreated = false;
    $scope.courseEditing = false;
    $scope.course_id = '';
    $scope.courseDetail = JSON.parse($state.params.course);

    if($scope.courseDetail.courseId !== undefined){
      $scope.courseEditing = true;
      $scope.courseAlreadyCreated = true;
      $scope.existingCourseId = $scope.courseDetail.courseId;
    } else {
      $scope.courseEditing = false;
    }

    $scope.videos = [{
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
    }];

    $scope.addNextLesson = function() {
      if($scope.courseAlreadyCreated === false){
        var arr = [];
        $scope.addingNextLesson = true;
        $http.post('/api/courses/create', $scope.courseDetail).success(function(response){
          $scope.course_id = response._id;
          $scope.lesson.courseId = response._id;
          $scope.lesson.videos = angular.copy($scope.videos);
          arr.push($http.post('/api/lessons/create', $scope.lesson));
          $q.all(arr).then(function(ret){
          }).finally(function(){
            $scope.addingNextLesson = false;
            $scope.courseAlreadyCreated = true;
            $scope.videos = [{
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
            }];

            $scope.lesson.name = '';
            $scope.lesson.description = '';
          });
        }).error(function(errorRes) {
          $scope.error = errorRes.message;
        });
      } else {
        var queue = [];
        $scope.addingNextLesson = true;

        if($scope.courseEditing === true){
          $scope.lesson.courseId = angular.copy($scope.existingCourseId);  
        } else {
          $scope.lesson.courseId = angular.copy($scope.course_id);
        }
        
        $scope.lesson.videos = angular.copy($scope.videos);
        queue.push($http.post('/api/lessons/create', $scope.lesson));
        $q.all(queue).then(function(ret){
        }).finally(function(){
          $scope.addingNextLesson = false;
          $scope.videos = [{
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
          }];
        });
      }
    };

    $scope.saveCourse = function() {
      var arr = [];
      $scope.addingCourseandLessons = true;
      if($scope.courseAlreadyCreated === false){
        $http.post('/api/courses/create', $scope.courseDetail).success(function(response){
          $scope.lesson.courseId = response._id;
          $scope.lesson.videos = angular.copy($scope.videos);
          arr.push($http.post('/api/lessons/create', $scope.lesson));
          $q.all(arr).then(function(ret){
          }).finally(function(){
            $scope.addingCourseandLessons = false;
            $timeout(function() {
              $state.go($state.previous.state.name || 'admin-home', $state.previous.params);
            },500);
          });
        }).error(function(errorRes) {
          $scope.error = errorRes.message;
        });
      } else {
        $scope.addingCourseandLessons = true;

        if($scope.courseEditing === true){
          $scope.lesson.courseId = angular.copy($scope.existingCourseId);  
        } else {
          $scope.lesson.courseId = angular.copy($scope.course_id);
        }

        $scope.lesson.videos = angular.copy($scope.videos);
        arr.push($http.post('/api/lessons/create', $scope.lesson));      
        $q.all(arr).then(function(ret){
        }).finally(function(){
          $scope.addingCourseandLessons = false;
          $timeout(function() {
            $state.go($state.previous.state.name || 'admin-home', $state.previous.params);
          },500);
        });
      }
    };

    $scope.clearInformation = function(index){
      $scope.videos.splice(index , 1);
    };

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

  }]);
