


app.controller('AdminStaffCtrl',function($scope,$routeParams,$rootScope,usersService) {

    if($rootScope.edit==true) {
        $rootScope.edit = false;
        location.reload();
    }
    var current=localStorage.getItem('currentUser');
    if (current== "undefined"||current==""||current==null){
        window.open("http://localhost:5000/#/login", "_self");
    }
    else {

        var user=JSON.parse(current);

        if(user.Type!=5&&user.Type!=4)
            window.open("http://localhost:5000/#/", "_self");
    }
    var promise = usersService.getUsers();
    promise.then(function (data)
    {
        $scope.AllUsers=data.data;


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
                    $rootScope.edit=true;
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
                        location.reload();

                    }
                };

                xmlhttp.open('POST', 'http://localhost:5000/deleteUser');
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                xmlhttp.send(JSON.stringify(document));

            }
        }
    });


});

