/**
 * Created by כהן on 18/01/2017.
 */
app.controller('MainPageCtrl', function ($scope,$rootScope) {
    var current=localStorage.getItem("currentUser");

    if(current== "undefined"||current==""||current==null)
         $rootScope.signOutButton = {'visibility': 'hidden'};
     else
         $rootScope.loginButton = {'visibility': 'hidden'};

    $rootScope.signInOut = function() {
      //  if (JSON.parse(current)== null) {
        var current=localStorage.getItem("currentUser");
        if (current== "undefined"||current==""||current==null) {
            window.open("http://localhost:5000/#/login", "_self");
            $rootScope.signOutButton = {'visibility': 'hidden'};

        }
        else
        {
            localStorage.setItem('currentUser','undefined');
            $rootScope.loginButton = {'visibility': 'visible'};
            $rootScope.signOutButton = {'visibility': 'hidden'};
            window.open("http://localhost:5000/#","_self")



        }
    }



});

