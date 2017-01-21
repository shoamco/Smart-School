

app.controller('updateStudentCtrl',function($scope,$routeParams,studentsService,$http) {
    $scope.StudentId = $routeParams.studentId;
    var promise = studentsService.getStudents();
    promise.then(function (data)
    {
        $scope.Students=data.data;


        for (var i = 0; i < $scope.Students.length; i++) {
            if ($scope.Students[i].StudentId ==  $scope.StudentId)
                $scope.student = $scope.Students[i];
        }


    });
    $scope.updateStudent = function() {



        if (window.XMLHttpRequest)
            var xmlhttp = new XMLHttpRequest();
        else
            var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

        var document =
            {

                "StudentId": $scope.StudentId,
                "FirstName":$scope.FirstName,
                "LastName": $scope.LastName,
                "ClassId":$scope.ClassId

            };

        xmlhttp.onreadystatechange = function () {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                // $scope.companyList = JSON.parse(xmlhttp.responseText);
                $scope.$apply();


            }
        }

        xmlhttp.open('POST', 'http://localhost:5000/createStudent');
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xmlhttp.send(JSON.stringify(document));
    }






});
