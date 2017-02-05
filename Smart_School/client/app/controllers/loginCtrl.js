

app.controller('loginCtrl',function($scope, $rootScope,$routeParams,usersService) {
    
    $scope.login = function() 
    {
        if (window.XMLHttpRequest)
            var xmlhttp = new XMLHttpRequest();
        else
            var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        var document =
        {
            "user":myForm1.user.value,
            "password":myForm1.password.value
        };
        xmlhttp.onreadystatechange = function () 
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
            {
                if (xmlhttp.responseText!='[]')
                {
                    var currentUser = xmlhttp.responseText;
                    console.log("currentUser~~~~~~~~~~~~",currentUser);
                    var curret = JSON.parse(currentUser);
                    console.log("curret~~~~~~~~",curret);
                    console.log("user____________",curret.UserName);
                    localStorage.setItem('currentUser',currentUser);
                    $rootScope.currentUser=curret;
                    $rootScope.$apply();
                    $rootScope.loginButton = {'visibility': 'hidden'};
                    $rootScope.signOutButton = {'visibility': 'visible'};
                    window.open("http://localhost:5000/#","_self");
                }
                else
                    alert("wrong password");

            }
        }

        xmlhttp.open('POST', 'http://localhost:5000/login');
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xmlhttp.send(JSON.stringify(document));
    }

    $scope.changePassword = function() 
    {
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
        xmlhttp.onreadystatechange = function () 
        {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {
                alert(xmlhttp.responseText);
            }
        }

        xmlhttp.open('POST', 'http://localhost:5000/login');
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xmlhttp.send(JSON.stringify(document));
           
    }

});


