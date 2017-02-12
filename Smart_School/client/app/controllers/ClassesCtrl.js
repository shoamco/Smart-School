
    app.controller('ClassesCtrl',function($scope,$routeParams,$rootScope,classesService,usersService) {
        var current=localStorage.getItem('currentUser');
        if (current== "undefined"||current==""||current==null){
            window.open("http://localhost:5000/#/login", "_self");
        }
        else {
            var user = JSON.parse(current);
            var userName = user.UserName;
            var promise = classesService.getClasses();
            var promise2 = usersService.getUsers();
            promise.then(function (data) {
                var Classes = data.data;
                var MyClasses = [];
                var classIndex = [];
                if(user.Type==1) {
                    for (var i = 0; i < Classes.length; i++) {

                        for (var j = 0; j < Classes[i].Courses.length; j++) {
                            if (Classes[i].Courses[j].TeacherId == user.UserId) {
                                if (!classIndex[Classes[i].ClassId]) {
                                    classIndex[Classes[i].ClassId] = "1";
                                    MyClasses.push(Classes[i]);
                                }
                            }
                        }
                    }
                    console.log("at the end ", MyClasses)
                    $scope.MyClasses = MyClasses;
                }
                else if(user.Type==2) {
                    for (var i = 0; i < Classes.length; i++) {
                        if (Classes[i].EducatorId == user.UserId) {
                            if (!classIndex[Classes[i].ClassId]) {
                                classIndex[Classes[i].ClassId] = "1";
                                MyClasses.push(Classes[i]);
                            }
                        }
                        for (var j = 0; j < Classes[i].Courses.length; j++) {
                            if (Classes[i].Courses[j].TeacherId == user.UserId) {
                                if (!classIndex[Classes[i].ClassId]) {
                                    classIndex[Classes[i].ClassId] = "1";
                                    MyClasses.push(Classes[i]);
                                }
                            }
                        }
                    }
                    console.log("at the end ", MyClasses)
                    $scope.MyClasses = MyClasses;
                }




                if(user.Type==3) {
                //    alert("רכז שכבה");
                    for (var i = 0; i < Classes.length; i++) {
                        if (Classes[i].CoordinatorId == user.UserId) {
                            if (!classIndex[Classes[i].ClassId]) {
                                classIndex[Classes[i].ClassId] = "1";
                                MyClasses.push(Classes[i]);
                            }
                        }
                    }
                  //  console.log("at the end ", MyClasses)
                    $scope.MyClasses = MyClasses;
                }

                else if(user.Type==4) {
                    //alert("מנהל");
                    $scope.MyClasses = Classes;
                }
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

                /*promise2.then(function (data)
                 {
                 $scope.AllUsers=data.data;

                 for (var i = 0; i < $scope.AllUsers.length; i++) {
                 if ($scope.AllUsers[i].UserId == $scope.UserId) {////arry of course
                 $scope.MyUser = AllUsers[i];
                 }
                 }

                 $scope.MyTClasses=[];///all course of this techear
                 for (var i = 0; i < $scope.ALLCourse.length; i++) {
                 if (Classes[i].TeacherName ==  $rootScope.currentUser.U) {////arry of course
                 $scope.MyTClasses.push($scope.ALLCourse[i]);
                 }
                 }

                 });*/
            });
        }
    });
