app.controller('updateClassCtrl',function($scope,$routeParams,classesService,$http,$window) {
    $scope.ClassId = $routeParams.classId;
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

                "Educator": myForm.Educator.value,
                "ClassIdOriginal": $scope.ClassId
            };
        xmlhttp.onreadystatechange = function () {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                $scope.message = xmlhttp.responseText;

                alert($scope.message);
                $scope.$apply();


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

