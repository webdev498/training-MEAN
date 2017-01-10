'use strict';

angular.module('core').controller('TutorController', ['$scope', '$state', '$http', '$location', '$timeout', '$q', 'Authentication',
  function ($scope, $state, $http, $location, $timeout, $q, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication.user;

    if($scope.authentication._id === undefined){
      $location.path('/authentication/signin');
    }

    $scope.importingStudent = false;
    $scope.updatingStudent = false;
    $scope.creatingCourseDetail = false;
    $scope.tabIndex = 1;
    
    var tutor_id = $scope.authentication._id;

    var url = '/api/studentsByTutor/' + tutor_id;

    $http.get(url).success(function(response) {
      $scope.students = response ;
    }).error(function(errorRes) {
      $scope.error = errorRes.message;
    });

    $http.get('/api/coursedetails/getAll').success(function (response) {
      $scope.coursedetails = response;

      $http.get('/api/courses/allCourses').success(function (res) {
        $scope.courses = res;
      });
    });

    $scope.importFromCSV = function() {
      $('#csvFile').click();
    };

    $scope.readCSVfileData = function(){
      var arr = [];

      $http.get('/api/students/getDataFromCSV').success(function(students){
        for(var i = 0 ; i < students.length; i++){
          var username = students[i].firstName[0] + students[i].lastName + students[i].lastName.length + students[i].firstName.length;
          var suffix = new Date().getTime();
          suffix = suffix.toString();
          students[i].username = username.toLowerCase() + suffix.slice(-5);
          students[i].password = username.toLowerCase() + 'ABC!@#';
          students[i].email = students[i].username + '@gmail.com';

          students[i].roles = 'student';
          students[i].signupPosition = 'student';
          students[i].rawPassword = students[i].password;
          students[i].tutor = tutor_id;
          arr.push($http.post('/api/auth/signup', students[i]));
          arr.push($http.post('/api/students/create', students[i]));
        }

        $q.all(arr).then(function(ret){
        }).finally(function(){
          $http.get('/api/students/removeCSVfile').success(function(response){
            $scope.importingStudent = false;
            $state.go($state.current, {}, { reload: true });
          });
        });
      });
    };

    $scope.studentDetail = function(id) {
      $location.path('/student-detail/' + id);
    };

    $scope.showProgress = function(index){
      var student_id = $scope.students[index]._id;
      var url = 'progress-certificate/' + student_id;
      $location.path(url);
    };

    $scope.getStudentList = function () {
      var objects = $('input[name="selected_students"]:checked');
      if(objects.length !== 0){
        $scope.id_array = [];
        for(var i = 0 ; i < objects.length; i++){
          var index = parseInt(objects.eq(i).attr('value'));
          $scope.id_array.push($scope.students[index]._id);
        }
      }
    };

    $scope.updateDescription = function (index) {
      $scope.courseDetail = {};
      $scope.courseDetail.students = [];

      $scope.courseDescription = $scope.courses[index].description;

      $scope.courseDetail.courseID = angular.copy($scope.courses[index]._id);
      
      for(var i = 0 ; i < $scope.id_array.length; i++){
        var object = {
          studentID: $scope.id_array[i],
          status: 'progress',
          score: 0
        };

        $scope.courseDetail.students.push(object);
      }
    };

    $scope.assignCourse = function () {
      $scope.creatingCourseDetail = true;
      $scope.lessonDetails = [];
      var arr = [];
      var courseID = $scope.courseDetail.courseID;
      $http.post('/api/coursedetails/create',$scope.courseDetail).success(function (response) {
        $http.get('/api/lessons/get/' + courseID).success(function (res) {
          for(var i = 0 ; i < res.length ; i++){
            var lessonDetail = {};
            lessonDetail.students = [];
            lessonDetail.lessonID = res[i]._id;
            for(var j = 0 ; j < $scope.id_array.length; j++){
              var object = {
                studentID: $scope.id_array[j]
              };
              lessonDetail.students.push(object);
            }
            $scope.lessonDetails.push(lessonDetail);
          }

          for(var k = 0 ; k < $scope.lessonDetails.length; k++){
            arr.push($http.post('/api/lessondetails/create', $scope.lessonDetails[k]));
          }
          $q.all(arr).then(function(ret){
          }).finally(function () {
            $scope.creatingCourseDetail = false;
          });
        });
      });
    };

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

    $('#assign_course').on('click', function(e) {
      var objects = $('input[name="selected_students"]:checked');
      if(objects.length === 0){
        alert('Please choose students to assign');
        e.stopPropagation();
      }
    });

    $('input#csvFile').change(function () {

      $scope.importingStudent = true;

      var files = $(this).get(0).files;

      if (files.length > 0){
        var formData = new FormData();
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          formData.append('uploads[]', file, file.name);
        }
      
        $.ajax({
          url: '/api/student/uploadCSVfile',
          type: 'POST',
          data: formData,
          processData: false,
          contentType: false,
          success: function(data){
            $scope.readCSVfileData();
          }
        });
      }
    });

  }]);
