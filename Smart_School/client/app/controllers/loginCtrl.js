/**

 */


app.controller('loginCtrl',function($scope, $rootScope,$routeParams,usersService) {
    /* var promise = usersService.login();
     promise.then(function (data)
     {

     });*/

    $scope.login = function() {

//alert("updateStudent in controller");

        if (window.XMLHttpRequest)
            var xmlhttp = new XMLHttpRequest();
        else
            var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

        var document =
            {

                "user":myForm1.user.value,
                "password":myForm1.password.value
            };

        xmlhttp.onreadystatechange = function () {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText!='[]'&&xmlhttp.responseText!="null"){
                    var currentUser =xmlhttp.responseText;
                   // console.log("currentUser~~~~~~~~~~~~",currentUser);
                    //var curret =JSON.parse(currentUser);
                    //console.log("curret~~~~~~~~",curret);
                   // curret=curret[0];
                    //alert (currentUser );
                    //console.log("user____________",curret.UserName);
                    localStorage.setItem('currentUser',currentUser);
                    //$rootScope.currentUser=curret;
                    //  $rootScope.$apply();
                    $rootScope.loginButton = {'visibility': 'hidden'};
                    $rootScope.signOutButton = {'visibility': 'visible'};
                    var user=JSON.parse(currentUser);

                    if (user.Type == 4 || user.Type == 5)
                        $rootScope.adminButton = {'visibility': 'visible'};
                    else
                        $rootScope.adminButton = {'visibility': 'hidden'};


                    window.open("http://localhost:5000/#/classes","_self")


                }
                else

                    alert("wrong password");

            }
        }

        xmlhttp.open('POST', 'http://localhost:5000/login');
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xmlhttp.send(JSON.stringify(document));
        //  $window.reload();
    }




    $scope.changePassword = function() {

//alert("updateStudent in controller");

        if (window.XMLHttpRequest)
            var xmlhttp = new XMLHttpRequest();
        else
            var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

        var document =
            {

                "user":passCng.user.value,
                "password":passCng.password.value,
                "newPassword":passCng.newPassword.value

            };

        xmlhttp.onreadystatechange = function () {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200){

                $scope.message =xmlhttp.responseText;
                if($scope.message=="הסיסמה הוחלפה בהצלחה.כנס עם הסיסמה החדשה שלך.")
                    window.history.back();
            }




        }

        xmlhttp.open('POST', 'http://localhost:5000/changePassword');
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xmlhttp.send(JSON.stringify(document));
        //  $window.reload();
    }

});
