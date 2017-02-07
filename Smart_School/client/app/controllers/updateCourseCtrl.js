app.controller('updateCourseCtrl',function($scope,$routeParams,classesService,$http,$window) {

    $scope.ClassId = $routeParams.classId;
    $scope.CourseId = $routeParams.courseId;
    var promise = classesService.getClasses();

    promise.then(function (data) {

        $scope.Classes = data.data;
        for (var i = 0; i < $scope.Classes.length; i++) {
            if ($scope.Classes[i].ClassId == $scope.ClassId)
                $scope.myClass = $scope.Classes[i];
        }
        for (var r = 0; r < $scope.myClass.Courses.length; r++) {
            if ($scope.myClass.Courses[r].CourseId == $scope.CourseId)
                $scope.myCourse = $scope.myClass.Courses[r];
        }


    $scope.updateCourse = function () {
        if (window.XMLHttpRequest)
            var xmlhttp = new XMLHttpRequest();
        else
            var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        var document =
            {

                "TeacherId": myForm.TeacherId.value,
                "ClassIdOriginal": $scope.ClassId,
                "CourseId": $scope.CourseId
            };
        xmlhttp.onreadystatechange = function () {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                $scope.message = xmlhttp.responseText;

                alert($scope.message);
                $scope.$apply();


            }
        };

        xmlhttp.open('POST', 'http://localhost:5000/updateCourse');
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xmlhttp.send(JSON.stringify(document));
    };


    });
});
