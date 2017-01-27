


app.controller('AdminStaffCtrl',function($scope,$routeParams,usersService) {

    var promise = usersService.getUsers();
    promise.then(function (data)
    {
        $scope.AllStaff=data.data;

     console.log("AllStaff"+AllStaff);
    });


});

