


app.controller('AdminStaffCtrl',function($scope,$routeParams,usersService) {
    //$scope.UserId = $routeParams.UserId;
    var promise = usersService.getUsers();
    promise.then(function (data)
    {
        $scope.AllUsers=data.data;

    // console.log("AllStaff"+AllStaff);
    });


});

