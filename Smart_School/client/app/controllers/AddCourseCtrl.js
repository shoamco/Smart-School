/**
 * Created by yael on 25/01/2017.
 */
app.controller('AddCourseCtrl',function($scope,$routeParams,classesService,$http,$window) {
    $scope.ClassId = $routeParams.classId;

    var current=localStorage.getItem('currentUser');
    if (current== "undefined"||current==""||current==null){
        window.open("http://localhost:5000/#/login", "_self");
    }
    else {

        var user=JSON.parse(current);

        if(user.Type!=5&&user.Type!=4)
            window.open("http://localhost:5000/#/", "_self");
    }

    var current=localStorage.getItem('currentUser');
    if (current== "undefined"||current==""||current==null){
        window.open("http://localhost:5000/#/login", "_self");
    }
    else {
        var user=JSON.parse(current);
        console.log(user.UserId);

        if(user.Type!=5&&user.Type!=4)
            window.open("http://localhost:5000/#/", "_self");
    }
    $scope.CreateCourse = function() {

        if (window.XMLHttpRequest)
            var xmlhttp = new XMLHttpRequest();
        else
            var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

        var document =
            {
                "CourseName":myForm.CourseName.value,
                "TeacherId": myForm.TeacherId.value,
                "CodeCourse": myForm.CourseCode.value,
                "ClassId": $scope.ClassId
            };

        xmlhttp.onreadystatechange = function () {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                $scope.message1 =xmlhttp.responseText;
                alert( $scope.message1);
                $scope.$apply();



            }
        }

        xmlhttp.open('POST', 'http://localhost:5000/AddCourse');
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xmlhttp.send(JSON.stringify(document));
    }


});