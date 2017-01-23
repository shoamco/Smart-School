

app.controller('updateStudentCtrl',function($scope,$routeParams,studentsService,$http) {
    $scope.StudenId = $routeParams.studentId;
    var promise = studentsService.getStudents();
    promise.then(function (data)
    {
        $scope.Students=data.data;


        for (var i = 0; i < $scope.Students.length; i++) {
            if ($scope.Students[i].StudentId ==  $scope.StudenId)
                $scope.student = $scope.Students[i];
        }


    });
    $scope.updateStudent = function() {

//alert("updateStudent in controller");

      //  alert(myForm1.FirstName.value);
        if (window.XMLHttpRequest)
            var xmlhttp = new XMLHttpRequest();
        else
            var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

        var document =
            {

                "StudentId":myForm1.StudentId.value,
                "FirstName":myForm1.FirstName.value,
                "LastName":myForm1.LastName.value,
                "ClassId": myForm1.ClassId.value,
                "StudentIdOriginal":  $scope.StudenId
            };

        xmlhttp.onreadystatechange = function () {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                $scope.message1 =xmlhttp.responseText;

                alert( $scope.message1);
                $scope.$apply();


            }
        }

        xmlhttp.open('POST', 'http://localhost:5000/updateStudent');
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xmlhttp.send(JSON.stringify(document));
    }






});
