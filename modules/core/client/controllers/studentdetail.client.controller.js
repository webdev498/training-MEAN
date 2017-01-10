'use strict';

angular.module('core').controller('StudentDetailController', ['$scope', '$state', '$http', '$location', '$timeout', '$q', 'Authentication',
  function ($scope, $state, $http, $location, $timeout, $q, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication.user;

    if($scope.authentication._id === undefined){
      $location.path('/authentication/signin');
    }

    $scope.remove_student = false;
    var studentID = $state.params.studentID;
    var activeCourses = [];
    var archivedCourses = [];
    $scope.activeCourses = [];
    $scope.archivedCourses = [];

    $http.get('/api/students/get/' + studentID).success(function(response) {
      $scope.currentstudent = response;
      $scope.student = angular.copy($scope.currentstudent);
      $http.get('/api/users/getUserId/' + $scope.currentstudent.username).success(function(response){
        $scope.currentstudent.user_id = response;
      });
    });

    /* Getting Active courses and Archived courses */
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

    /* Certificate function */
    $scope.certificate = function (index) {
      var courseID = $scope.archivedCourses[index].course._id;
      $http.get('/api/lessons/get/' + courseID).success(function (response) {
        var lessons = '';
        for(var i = 0 ; i < response.length; i++){
          lessons += response[i].name +', ';
        }
        lessons = lessons.trim().slice(0, -1);

        var data = {
          courseName: $scope.archivedCourses[index].course.name,
          studentName: $scope.currentstudent.firstName + ' ' + $scope.currentstudent.lastName,
          lessons: lessons,
          courseDescription: $scope.archivedCourses[index].course.description,
          completedDate: $scope.archivedCourses[index].lastActivity,
          percent : $scope.archivedCourses[index].score
        };

        $http.post('/api/courses/certificate',data).success(function (response) {
          window.open('/api/downloadPDF/' + response);

        }).error(function (err) {
          console.log(err);
        });

      });
    };

    /* ********************************************* */
    $scope.updateStudent = function(isValid){
      if($scope.remove_student === false){
        $scope.currentstudent.password = angular.copy($scope.currentstudent.rawPassword);
        $http.put('/api/students/update',$scope.currentstudent).success(function(response){
          delete $scope.currentstudent._id;
          $http.put('/api/users/update_student_user',$scope.currentstudent).success(function(res){

            $timeout(function(){
              $location.path('/tutor-home');  
            },500);
          });
        });
      } else {
        var r = confirm('Do you really want to delete this student ?');
        if (r === true) {
          var username = $scope.currentstudent.username;

          var student_remove_url = '/api/studentsRemoveByUsername/' + username;
          var user_remove_url = '/api/users/removeByUsername/' + username;
          $http.delete(student_remove_url).success(function(response){
            $http.delete(user_remove_url).success(function(res){
              $timeout(function(){
                $location.path('/tutor-home');  
              },500);
            });
          });
        }
      }
    };

    $scope.back = function(){
      $state.go($state.previous.state.name || 'tutor-home', $state.previous.params);
    };

  }]);
