/**
 * Created by נעמי יונג on 23/01/2017.
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
                if (xmlhttp.responseText!='[]'){
                    $rootScope.currentUser =xmlhttp.responseText;
                    alert ( $rootScope.currentUser );
                    $rootScope.$apply();
                    $rootScope.loginButton = {'visibility': 'hidden'};
                    $rootScope.signOutButton = {'visibility': 'visible'};

                    window.open("http://localhost:5000/#","_self")


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

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)

                alert(xmlhttp.responseText);




        }

        xmlhttp.open('POST', 'http://localhost:5000/login');
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xmlhttp.send(JSON.stringify(document));
        //  $window.reload();
    }

});