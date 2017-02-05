/**
 * Created by כהן on 18/01/2017.
 */
app.controller('MainPageCtrl', function ($scope,$rootScope) {
    if(JSON.parse(localStorage.getItem('currentUser'))== null)
        $rootScope.signOutButton = {'visibility': 'hidden'};
    else
        $rootScope.loginButton = {'visibility': 'hidden'};

    $rootScope.signInOut = function() {
        if (JSON.parse(localStorage.getItem('currentUser'))== null) {
            window.open("http://localhost:5000/#/login", "_self");
            $rootScope.signOutButton = {'visibility': 'hidden'};

        }
        else
        {
            localStorage.setItem('currentUser', null);
            $rootScope.loginButton = {'visibility': 'visible'};
            $rootScope.signOutButton = {'visibility': 'hidden'};


        }
    }



});

