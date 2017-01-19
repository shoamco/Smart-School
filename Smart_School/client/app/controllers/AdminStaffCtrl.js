


app.controller('AdminStaffCtrl',function($scope,$routeParams,staffService) {

    var promise = staffService.getStaff();
    promise.then(function (data)
    {
        $scope.AllStaff=data.data;


    });


});

