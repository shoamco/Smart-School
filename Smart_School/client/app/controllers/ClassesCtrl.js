
    app.controller('ClassesCtrl',function($scope,$routeParams,classesService,usersService) {

     $scope.UserId=9;
        var promise = classesService.getClasses();
        var promise2 = usersService.getUsers();
        promise.then(function (data)
        {
            $scope.Classes=data.data;
            //  $scope.selectionGrade = function (myclass) {
            //   $scope.$parent.allStudents=data.data;/////////////////////
            //   $scope.$parent.Students=[];
            //     // $scope.Students=[];
            //
            //      alert($scope.$parent.allStudents);
            // // console.log("class"+myclass);
            // for (var i = 0; i < $scope.$parent.allStudents.length; i++) {
            //         if (  $scope.$parent.allStudents[i].ClassId == myclass)
            //          $scope.$parent.Students.push( $scope.$parent.allStudents[i]);
            //    }
            //     }
            promise2.then(function (data)
            {
                $scope.AllUsers=data.data;

                for (var i = 0; i < $scope.AllUsers.length; i++) {
                    if ($scope.AllUsers[i].UserId == $scope.UserId) {////arry of course
                        $scope.MyUser = AllUsers[i];
                    }
                }

                //      $scope.MyClasses=[];///all course of this techear
                //      for (var i = 0; i < $scope.ALLCourse.length; i++) {
                //       if ($scope.AllClasses[i].TeacherName ==  "יאיר כהן") {////arry of course
                //          $scope.MyClasses.push($scope.ALLCourse[i]);
                //      }
                // }

            });
      });

    });
