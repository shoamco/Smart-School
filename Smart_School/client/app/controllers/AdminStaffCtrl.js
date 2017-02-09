


app.controller('AdminStaffCtrl',function($scope,$routeParams,usersService) {
    //$scope.UserId = $routeParams.UserId;
    var promise = usersService.getUsers();
    promise.then(function (data)
    {
        $scope.AllUsers=data.data;

    // console.log("AllStaff"+AllStaff);
    //     for (var i = 0; i < $scope.AllUsers.length; i++) {

        //     if ($scope.AllUsers[i].UserId ==  $scope.UserId){
        //         alert("I am in if");
        //         $scope.user = $scope.AllUsers[i];}
        // }
        $scope.createStuff = function() {

            if (window.XMLHttpRequest)
                var xmlhttp = new XMLHttpRequest();
            else
                var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

            var document =
                {

                    "UserName":myForm1.UserName.value,
                     "UserId":myForm1.UserId.value,
                    "Type":myForm1.Type.value,
                    "password":myForm1.password.value,

                };

            xmlhttp.onreadystatechange = function () {

                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    $scope.message1 =xmlhttp.responseText;

                    alert( $scope.message1);
                    $scope.$apply();
                    setTimeout(function() {
                        window.open("http://localhost:5000/#/admin/staff","_self");
                    }, 1000);



                }
            }

            xmlhttp.open('POST', 'http://localhost:5000/createStuff ');
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
            xmlhttp.send(JSON.stringify(document));
            //  $window.reload();
        }
        $scope.deleteUser=function(UserId) {
            alert(UserId);
            if(confirm('האם אתה בטוח שהינך מעוניין למחוק את איש הצוות? '+UserId+" ?")){


                if (window.XMLHttpRequest)
                    var xmlhttp = new XMLHttpRequest();
                else
                    var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                var document =
                    {

                        "UserId": UserId,

                    };
                xmlhttp.onreadystatechange = function () {

                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        $scope.message = xmlhttp.responseText;

                        alert($scope.message);
                        $scope.$apply();

                    }
                };

                xmlhttp.open('POST', 'http://localhost:5000/deleteUser');
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                xmlhttp.send(JSON.stringify(document));

            }
        }
    });


});

