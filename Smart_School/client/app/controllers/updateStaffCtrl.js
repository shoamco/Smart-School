/**
 * Created by כהן on 27/01/2017.
 */
app.controller('updateStaffCtrl',function($scope,$routeParams,$rootScope,usersService) {
    $scope.UserId = $routeParams.UserId;
   // var current=localStorage.getItem('currentUser');
    // if (current== "undefined"||current==""||current==null){
    //     window.open("http://localhost:5000/#/login", "_self");
    // }
    // else {
    //     var user=JSON.parse(current);
    //     console.log(user.UserId);
    //
    //     if(user.Type!=5&&user.Type!=4)
    //         window.open("http://localhost:5000/#/", "_self");
    // }
    var promise = usersService.getUsers();
    promise.then(function (data)
    {
        $scope.AllUsers=data.data;

        for (var i = 0; i < $scope.AllUsers.length; i++) {

            if ($scope.AllUsers[i].UserId ==  $scope.UserId){
              //  alert("I am in if");
                $scope.user = $scope.AllUsers[i];}
        }

        $scope.updateStaff = function() {

//alert("updateStaff in controller");

       // alert(myForm1.Type.value);
            if (window.XMLHttpRequest)
                var xmlhttp = new XMLHttpRequest();
            else
                var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

            var document =
                {

                    "UserName":myForm1.UserName.value,
                    "Type":myForm1.Type.value,
                    "UserOriginalId": $scope.UserId

                };

            xmlhttp.onreadystatechange = function () {

                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    $scope.message1 =xmlhttp.responseText;

                    alert( $scope.message1);
                    $scope.$apply();
                    $rootScope.edit=true;

                    setTimeout(function() {
                        window.open("http://localhost:5000/#/admin/staff","_self");
                    }, 1000);



                }
            }

            xmlhttp.open('POST', 'http://localhost:5000/updateStaff ');
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
            xmlhttp.send(JSON.stringify(document));
            //  $window.reload();
        }






    });




});



