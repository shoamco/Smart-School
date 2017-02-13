/**
 * Created by כהן on 19/01/2017.
 */



app.controller('AdminStudentsCtrl',function($scope,$routeParams,$rootScope,studentsService) {
    var current=localStorage.getItem('currentUser');
    if (current== "undefined"||current==""||current==null){
        window.open("http://localhost:5000/#/login", "_self");
    }
    else {

        var user=JSON.parse(current);

        if(user.Type!=5&&user.Type!=4)
            window.open("http://localhost:5000/#/", "_self");
    }
    if($rootScope.edit==true) {
        $rootScope.edit = false;
        location.reload();
    }

    $scope.StudentId = $routeParams.studentId;

    var promise = studentsService.getStudents();
    promise.then(function (data)
    {
        $scope.AllStudents=data.data;




    });


    $scope.deleteStudent=function(id) {

        if(confirm('האם אתה בטוח שהינך מעוניין למחוק את הסטודנט '+id+" ?")){

            if (window.XMLHttpRequest)
                var xmlhttp = new XMLHttpRequest();
            else
                var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            console.log(id);
            xmlhttp.open("GET","http://localhost:5000/deleteStudent/"+id, true);

            xmlhttp.send();

            xmlhttp.onreadystatechange = function(){
                if (xmlhttp.readyState==4 && xmlhttp.status==200){
                    $scope.message1 =xmlhttp.responseText;
                    alert( $scope.message1);
                  //  $scope.companyList=JSON.parse(xmlhttp.responseText);
                    $scope.$apply();
                    location.reload();


                }

            }
        }
    }









});

