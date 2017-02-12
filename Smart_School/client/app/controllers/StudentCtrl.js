
app.controller('StudentCtrl',function($scope,$routeParams,studentsService,classesService,usersService) {
    $scope.StudentId = $routeParams.studentId;
    var promise = studentsService.getStudents();
    var promise2 = classesService.getClasses();
    var promise3 = usersService.getUsers();
    promise.then(function (data)
    {


        $scope.Students=data.data;


        for (var i = 0; i < $scope.Students.length; i++) {
            if ($scope.Students[i].StudentId ==  $scope.StudentId)
                $scope.student = $scope.Students[i];
        }

         console.log($scope.student);

        promise2.then(function (data2) {
            $scope.ALLClasses=data2.data;

         // alert( $scope.ALLClasses);


            for (var i = 0; i < $scope.ALLClasses.length; i++) {
              //  alert($scope.ALLClasses[i].ClassId);
                if ($scope.student.ClassId == $scope.ALLClasses[i].ClassId) {
                   // alert( $scope.ALLClasses[i]);
                    $scope.myClass =  $scope.ALLClasses[i];


//alert($scope.myClass);
                }
            }

            promise3.then(function (data3) {




                $scope.ALLUsers=data3.data;
              $scope.findTeacher = function(teacherid) {
                  for (var i = 0; i < $scope.ALLUsers.length; i++) {

//alert( $scope.ALLUsers[i].UserId);
                     if (teacherid==  $scope.ALLUsers[i].UserId) {
                        return  $scope.ALLUsers[i].UserName;

                      }

              }


        }

    });
        });
    });
});
