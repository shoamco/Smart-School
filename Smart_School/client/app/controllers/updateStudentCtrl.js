

app.controller('updateStudentCtrl',function($scope,$routeParams,studentsService,$http) {
    $scope.StudentId = $routeParams.studentId;
    var promise = studentsService.getStudents();
    promise.then(function (data)
    {
        $scope.Students=data.data;


        for (var i = 0; i < $scope.Students.length; i++) {
            if ($scope.Students[i].StudentId ==  $scope.StudentId)
                $scope.student = $scope.Students[i];
        }


    });
     // var promise1 = studentsService.updateStudent();
    // promise1.then(function (data)
    // {
    //
    // });

  // $scope.updateStudent = function ()
  //   {
  //       console.log("in client");
  //       alert("in ctrl");
  //       studentsService.updateStudent();
  //       // $http.post("updateStudent").then(function (data)
  //       // {
  //       //     alert("in client updateStudent");
  //       //
  //       //     deferred.resolve(data);
  //       // });
  //   }





});
