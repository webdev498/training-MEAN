'use strict';

angular.module('core').controller('ProgressCertificateController', ['$scope', '$state', '$http', '$location', '$timeout', '$q', 'Authentication',
  function ($scope, $state, $http, $location, $timeout, $q, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication.user;

    if($scope.authentication._id === undefined){
      $location.path('/authentication/signin');
    }

    $scope.tabIndex = 1;

    var activeCourses = [];
    var archivedCourses = [];
    $scope.activeCourses = [];
    $scope.archivedCourses = [];
    $scope.certificating = false;

    var studentID = $state.params.studentIndex;

    /* Getting Student Information */

    $http.get('/api/students/get/' + studentID).success(function(response) {
      $scope.currentStudent = response;
    });

    $http.get('/api/courses/allCourses').success(function (res) {
      $scope.courses = res;
      $http.get('/api/coursedetails/getAll').success(function (response) {
        $scope.coursedetails = response;

        for(var i = 0 ; i <response.length ; i++) {
          for(var k = 0 ; k < response[i].students.length; k++){
            if(response[i].students[k].studentID === studentID){
              var courseID = response[i].courseID;
              if(response[i].students[k].status === 'progress'){
                activeCourses.push(courseID);
              } else {
                archivedCourses.push(courseID);
              }
            }
          }
        }

        for(var ii = 0 ; ii < activeCourses.length; ii++){
          for(var jj = 0 ; jj < $scope.courses.length; jj++){
            if($scope.courses[jj]._id === activeCourses[ii]){
              $scope.activeCourses.push($scope.courses[jj]);
            }
          }
        }
        
        for(var iii = 0 ; iii < archivedCourses.length; iii++){
          for(var jjj = 0 ; jjj< $scope.courses.length; jjj++){
            if($scope.courses[jjj]._id === archivedCourses[iii]){
              var object = {
                course: $scope.courses[jjj],
                status: 'Completed',
                score: '95',
                lastActivity: '27-03-2016 15:53:10'
              };

              $scope.archivedCourses.push(object);
            }
          }
        }
      });
    });

    $scope.getEnrolledStudents = function (id) {
      var length = 0;
      for(var i = 0 ; i < $scope.coursedetails.length; i++){
        if($scope.coursedetails[i].courseID === id){
          var students = $scope.coursedetails[i].students;
          for(var k = 0; k < students.length; k++){
            if(students[k].status === 'progress'){
              length = length + 1;
            }
          }
        }
      }
      return length;
    };

    $scope.getPastStudents = function (id) {
      var length = 0;
      for(var i = 0 ; i < $scope.coursedetails.length; i++){
        if($scope.coursedetails[i].courseID === id){
          var students = $scope.coursedetails[i].students;
          for(var k = 0; k < students.length; k++){
            if(students[k].status === 'past'){
              length = length + 1;
            }
          }
        }
      }
      return length;
    };

    $scope.certificate = function (index) {
      $scope.certificating = true;
      var courseID = $scope.archivedCourses[index].course._id;
      $http.get('/api/lessons/get/' + courseID).success(function (response) {
        var lessons = '';
        for(var i = 0 ; i < response.length; i++){
          lessons += response[i].name +', ';
        }
        lessons = lessons.trim().slice(0, -1);

        var data = {
          courseName: $scope.archivedCourses[index].course.name,
          studentName: $scope.currentStudent.firstName + ' ' + $scope.currentStudent.lastName,
          lessons: lessons,
          courseDescription: $scope.archivedCourses[index].course.description,
          completedDate: '27-03-2016',
          percent : 94
        };

        $http.post('/api/courses/certificate',data).success(function (response) {
          $scope.certificating = false;
          window.open('/api/downloadPDF/' + response);

        }).error(function (err) {
          console.log(err);
        });

      });
    };

    $scope.back = function () {
      $state.go($state.previous.state.name || 'tutor-home', $state.previous.params);  
    };

  }]);
