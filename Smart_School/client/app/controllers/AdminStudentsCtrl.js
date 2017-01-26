/**

 */



app.controller('AdminStudentsCtrl',function($scope,$routeParams,studentsService) {
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
                     //  $scope.companyList=JSON.parse(xmlhttp.responseText)  
                        $scope.$apply();
                    // $( ".data" ).load(window.location.href + " .data" );
                }

            }
        }
    }  
});

