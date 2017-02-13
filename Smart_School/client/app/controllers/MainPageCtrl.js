app.controller('MainPageCtrl', function ($scope,$rootScope) {
    var current=localStorage.getItem("currentUser");

    if(current== "undefined"||current==""||current==null)
        $rootScope.signOutButton = {'visibility': 'hidden'};


    $rootScope.signInOut = function() {
        //  if (JSON.parse(current)== null) {
        var current=localStorage.getItem("currentUser");
        if (current== "undefined"||current==""||current==null) {
            window.open("http://localhost:5000/#/classes", "_self");
            $rootScope.signOutButton = {'visibility': 'hidden'};


        }
        else
        {
            localStorage.setItem('currentUser','undefined');
            $rootScope.signOutButton = {'visibility': 'hidden'};
            window.open("http://localhost:5000/#/login","_self")



        }
    }

    $rootScope.changePassword = function() {
        //  if (JSON.parse(current)== null) {

            window.open("http://localhost:5000/#/changePassword", "_self");


    }

    var current1 = localStorage.getItem('currentUser');
    if (current1 == "undefined" || current1 == "" || current1 == null) {
        window.open("http://localhost:5000/#/login", "_self");
    }
    else {
        var user = JSON.parse(current1);
        $scope.user = user;

    }



    //
    // if( user.Type==4|| user.Type==5)
    // {
    //     // alert("yes");
    //     $scope.adminType1=1;
    // }
    // else
    //     $scope.adminType1=0;
    // $scope.refresh=1;
    //

    $scope.adminType= function() {
//alert("admin"+user.Type);
        // $rootScope.edit==true;
        // location.reload();
        $scope.refresh=1;
        if( user.Type==4|| user.Type==5)
        {
            // alert("yes");
            return 1;
        }
        else
            return 0;

    }
    if( $scope.refresh==1) {
        $scope.refresh = 0;
        location.reload();
    }
    $scope.admin= function() {
        window.open("http://localhost:5000/#admin","_self")
    }

});
