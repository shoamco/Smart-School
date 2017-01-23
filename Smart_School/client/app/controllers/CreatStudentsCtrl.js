/**
 * Created by כהן on 19/01/2017.
 */

app.controller("CreatStudentsCtrl", function ($scope, $http) {

   //
    $scope.createStudent = function() {



        if (window.XMLHttpRequest)
            var xmlhttp = new XMLHttpRequest();
        else
            var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

        var document =
            {

                "StudentId": $scope.StudentId,
                "FirstName":$scope.FirstName,
                "LastName": $scope.LastName,
                "ClassId":myForm.ClassId.value

            };

        xmlhttp.onreadystatechange = function () {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
              $scope.message1 =xmlhttp.responseText;
                $scope.$apply();
                //alert(xmlhttp.responseText);


            }
        }

        xmlhttp.open('POST', 'http://localhost:5000/createStudent');
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xmlhttp.send(JSON.stringify(document));
    }


});