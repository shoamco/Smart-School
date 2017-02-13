
app.controller('ClassesCtrl',function($scope,$routeParams,$rootScope,classesService,usersService,$timeout) {
    var current=localStorage.getItem('currentUser');
    if (current== "undefined"||current==""||current==null){
        window.open("http://localhost:5000/#/login", "_self");
    }
    else {
        var user = JSON.parse(current);
        var userName = user.UserName;
        $scope.AccessToUpdate=false;
        $scope.AccessToUpdate=false;
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

         $timeout(function() {
                if(document.getElementById("myBtn")){
                var modal = document.getElementById('myModal');

                // Get the button that opens the modal
                var btn = document.getElementById("myBtn");
                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];
                // When the user clicks the button, open the modal 
                $scope.display = function(id) {
                    console.log("id",id);

                    var classname="modal"+id;
                    console.log("Classname",document.getElementsByClassName(classname)[0]);
                    document.getElementsByClassName(classname)[0].style.display = "block";

                }

                // When the user clicks on <span> (x), close the modal
                $scope.exit = function(id) {
                    var classname="modal"+id;
                    console.log("##########");
                    document.getElementsByClassName(classname)[0].style.display  = "none";
                }

                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
            }
             }, 10); 


        var GetClass = function(id)
        {
            for (var i = 0; i < $scope.MyClasses.length; i++) {
                if($scope.MyClasses[i].ClassId==id)
                {
                    $scope.thisClass=$scope.MyClasses[i];
                }
            }

        }
        $scope.accessToConfirm= function(id) {
           // alert($scope.thisClass.ClassId);

           GetClass(id);
           if($scope.thisClass){
            if($scope.thisClass.EducatorId==user.UserId){
                return "1";
                $scope.AccessToUpdate==true;
            }
            // else if($scope.thisClass.CoordinatorId==user.UserId)
            //     return "1";
            else if(user.Type==3){
                return "1";
                 $scope.AccessToUpdate==true;
            }
            else if(user.Type==4){
                return "1";
                 $scope.AccessToUpdate==true;
            }
            else{
                return "0";
                 $scope.AccessToUpdate==false;

            }
            }
        }
        $scope.accessToUpdate= function(id) {
            var flag=0;
            GetClass(id);

            if(user.Type==1){
                return "1";
                $scope.AccessToUpdate=true;
            }
            else if(user.Type==2 && flag==1){
                return "1";
                $scope.AccessToUpdate=true;
            }
            else{
                return "0";
                $scope.AccessToUpdate=false;
            }
        }


        
            
        });

    }
  
});
