/**

 */
app.controller('ClassCtrl',function($scope,$routeParams,$rootScope,classesService,usersService) {
    var current=localStorage.getItem('currentUser');
    if (current== "undefined"||current==""||current==null){
        window.open("http://localhost:5000/#/login", "_self");
    }
    else {
        var user=JSON.parse(current);
    }

    $scope.id = $routeParams.id;
   // var userName=$rootScope.currentUser.UserName; 
    var promise = classesService.getClasses();

    promise.then(function (data)
    {
        var myCourses=[];
        $scope.Classes=data.data;
        for (var i = 0; i < $scope.Classes.length; i++) {
            if ($scope.Classes[i].ClassId == $scope.id) {
                $scope.MyClass = $scope.Classes[i].Students;
                $scope.thisClass=$scope.Classes[i];
                for (var j = 0; j < $scope.Classes[i].Courses.length; j++) {
                    if ($scope.Classes[i].Courses[j].TeacherId == user.id) {
                        myCourses.push($scope.Classes[i].Courses[j]);
                    }
                }
            }
        }
        $scope.accessToConfirm= function() {
           // alert($scope.thisClass.ClassId);
            if($scope.thisClass.EducatorId==user.UserId)
                return "1";
            // else if($scope.thisClass.CoordinatorId==user.UserId)
            //     return "1";
            else
                return "0";
        }

        $scope.myCourses=myCourses
    });


    
    /*var promise = usersService.getUsers();
     promise.then(function (data)
    {
        $scope.Users=data.data;
        console.log($scope.Users);

    });*/

});