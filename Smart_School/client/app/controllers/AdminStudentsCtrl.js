/**
 * Created by כהן on 19/01/2017.
 */



app.controller('AdminStudentsCtrl',function($scope,$routeParams,studentsService) {
    $scope.StudentId = $routeParams.studentId;

    var promise = studentsService.getStudents();
    promise.then(function (data)
    {
        $scope.AllStudents=data.data;


    });



    // $scope.deleteStudent=function(id) {
    //     var res=$scope.AllStudents.filter(function (item,index,nums) {
    //         return student._id==id;
    //     })
    //     if(confirm('האם אתה בטוח שהינך מעוניין למחוק את הסטודנט '+res[0].FirstName+" ?")){
    //
    //         if (window.XMLHttpRequest)
    //             var xmlhttp = new XMLHttpRequest();
    //         else
    //             var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    //         console.log(id);
    //         xmlhttp.open("GET","http://localhost:5000/deleteStudent/$scope.StudentId/"+id, true);
    //
    //         xmlhttp.send();
    //
    //         xmlhttp.onreadystatechange = function(){
    //             if (xmlhttp.readyState==4 && xmlhttp.status==200){
    //                 //alert(xmlhttp.responseText);
    //                 $scope.companyList=JSON.parse(xmlhttp.responseText);
    //                 $scope.$apply();
    //             }
    //
    //         }
    //     }
    // }









});

