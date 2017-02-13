
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


       // alert(user.Type);
        if(user.Type==5){

            window.open("http://localhost:5000/#admin","_self")}
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
            if(user.Type==3) {//grade teacher
                for (var i = 0; i < Classes.length; i++) {
                    if (Classes[i].CoordinatorId == user.UserId) {
                        if (!classIndex[Classes[i].ClassId]) {
                            classIndex[Classes[i].ClassId] = "1";
                            MyClasses.push(Classes[i]);
                        }
                    }
                }
                $scope.MyClasses = MyClasses;
            }
            else if(user.Type==4) {//principal
                $scope.MyClasses = Classes;
             }

        });
    }
 
});
