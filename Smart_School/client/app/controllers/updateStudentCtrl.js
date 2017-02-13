

app.controller('updateStudentCtrl',function($scope,$rootScope,$routeParams,studentsService,$http,$window) {
    $scope.StudenId = $routeParams.studentId;
    var current=localStorage.getItem('currentUser');
    if (current== "undefined"||current==""||current==null){
        window.open("http://localhost:5000/#/login", "_self");
    }
    else {

        var user=JSON.parse(current);

        if(user.Type!=5&&user.Type!=4)
            window.open("http://localhost:5000/#/", "_self");
    }
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
                $rootScope.edit=true;
                setTimeout(function() {
                    window.open("http://localhost:5000/#/admin/students","_self");
                }, 1000);


            }
        }

        xmlhttp.open('POST', 'http://localhost:5000/updateStudent');
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xmlhttp.send(JSON.stringify(document));
      //  $window.reload();
    }






});
