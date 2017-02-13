app.controller('updateClassCtrl',function($scope,$rootScope,$routeParams,classesService,$http,$window) {
    var current=localStorage.getItem('currentUser');
    if (current== "undefined"||current==""||current==null){
        window.open("http://localhost:5000/#/login", "_self");
    }
    else {

        var user=JSON.parse(current);

        if(user.Type!=5&&user.Type!=4)
            window.open("http://localhost:5000/#/", "_self");
    }
     $scope.ClassId = $routeParams.classId;

    // $scope.ClassId = $routeParams.classId;

    // $scope.ClassId = $routeParams.classId;


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

                    setTimeout(function() {
                       location.reload();
                    }, 1000);

                }
            };

            xmlhttp.open('POST', 'http://localhost:5000/deleteCourse');
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
            xmlhttp.send(JSON.stringify(document));

        }
    }

});

