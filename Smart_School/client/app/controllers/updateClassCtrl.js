app.controller('updateClassCtrl',function($scope,$routeParams,$rootScope,classesService,$http,$window) {
<<<<<<< HEAD
     $scope.ClassId = $routeParams.classId;
=======
    // $scope.ClassId = $routeParams.classId;
>>>>>>> a9b24075f49689838547c6b0b99578ac7df313b4
    // var current=localStorage.getItem('currentUser');
    // if (current== "undefined"||current==""||current==null){
    //     window.open("http://localhost:5000/#/login", "_self");
    // }
    // else {
    //     var user=JSON.parse(current);
    //     console.log(user.UserId);
    //
    //     if(user.Type!=5&&user.Type!=4)
    //         window.open("http://localhost:5000/#/", "_self");
    // }
    var promise = classesService.getClasses();
    promise.then(function (data) {
        $scope.Classes = data.data;
        for (var i = 0; i < $scope.Classes.length; i++) {
            if ($scope.Classes[i].ClassId == $scope.ClassId)
                $scope.myClass = $scope.Classes[i];
        }
    });

    $scope.updateClass = function () {
        if (window.XMLHttpRequest)
            var xmlhttp = new XMLHttpRequest();
        else
            var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        var document =
            {

                "EducatorId": myForm.EducatorId.value,
                "ClassIdOriginal": $scope.ClassId,
                "CoordinatorId":myForm.CoordinatorId.value
            };
        xmlhttp.onreadystatechange = function () {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                $scope.message = xmlhttp.responseText;

                alert($scope.message);
                $scope.$apply();
                $rootScope.edit=true;

                setTimeout(function() {
                    window.open("http://localhost:5000/#/admin/classes","_self");
                }, 1000);


            }
        };

        xmlhttp.open('POST', 'http://localhost:5000/updateClass');
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xmlhttp.send(JSON.stringify(document));
    };
    $scope.deleteCourse=function(courseid) {
        alert(courseid);
        if(confirm('האם אתה בטוח שהינך מעוניין למחוק את קורס '+courseid+" ?")){


            if (window.XMLHttpRequest)
                var xmlhttp = new XMLHttpRequest();
            else
                var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            var document =
                {

                    "CourseId": courseid,
                    "ClassId": $scope.ClassId
                };
            xmlhttp.onreadystatechange = function () {

                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    $scope.message = xmlhttp.responseText;

                    alert($scope.message);
                    $scope.$apply();


                }
            };

            xmlhttp.open('POST', 'http://localhost:5000/deleteCourse');
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
            xmlhttp.send(JSON.stringify(document));

        }
    }

});

