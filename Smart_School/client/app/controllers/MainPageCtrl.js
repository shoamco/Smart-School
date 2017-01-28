/**
 * Created by כהן on 18/01/2017.
 */
app.controller('MainPageCtrl', function ($scope,$rootScope) {
    if($rootScope.currentUser == undefined)
        $rootScope.signOutButton = {'visibility': 'hidden'};

    $rootScope.signInOut = function() {
        if ($rootScope.currentUser == undefined) {
            window.open("http://localhost:5000/#/login", "_self");
            $rootScope.signOutButton = {'visibility': 'hidden'};

        }
        else
        {
            $rootScope.currentUser = undefined;
            $rootScope.loginButton = {'visibility': 'visible'};
            $rootScope.signOutButton = {'visibility': 'hidden'};


        }
    }



});

