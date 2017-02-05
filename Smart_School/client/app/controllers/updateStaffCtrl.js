/**
 * Created by כהן on 27/01/2017.
 */
app.controller('updateStaffCtrl',function($scope,$routeParams,usersService) {
    $scope.UserId = $routeParams.UserId;
    var current=localStorage.getItem('currentUser');
    if (current== "undefined"||current==""||current==null){
        window.open("http://localhost:5000/#/login", "_self");
    }
    else {
        var user=JSON.parse(current);
        console.log(user.UserId);

        if(user.type!=5&&user.type!=4)
            window.open("http://localhost:5000/#/", "_self");
    }
    var promise = usersService.getUsers();
    promise.then(function (data)
    {
        $scope.AllUsers=data.data;

        for (var i = 0; i < $scope.AllUser.length; i++) {
            if ($scope.AllUser[i].UserId ==  $scope.UserId)
                $scope.user = $scope.AllUser[i];
        }
    });


});
