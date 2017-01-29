
    app.controller('ClassesCtrl',function($scope,$routeParams,$rootScope,classesService,usersService) {

     $scope.UserId=9;
        var userName=$rootScope.currentUser.UserName;
        var promise = classesService.getClasses();
        var promise2 = usersService.getUsers();
        promise.then(function (data)
        {
            var Classes=data.data;
            var MyClasses=[];

            console.log("_____all classes__________",Classes);
            console.log( "?????????????",Classes.length);
             for (var i =0; i< Classes.length;i++)
             {
                    console.log("___________class_________",Classes[i].Educator);
                    console.log("__________username__________",userName);
                if(Classes[i].Educator==userName){
                    console.log("_______inside");
                        MyClasses.push(Classes[i]);
                }
                for(var j=0 ;j<Classes[i].Courses.length;j++)
                {
                    if(Classes[i].Courses[j].TeacherName==userName)
                    {    
                        MyClasses.push(Classes[i]);
                    }
                }
             }
             console.log("_____________at the end",MyClasses);
            $scope.MyClasses=MyClasses;
            console.log("_____________at the end",$scope.MyClasses);



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
