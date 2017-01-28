/**
 * Created by כהן on 27/01/2017.
 */
app.controller('updateStaffCtrl',function($scope,$routeParams,usersService) {
    $scope.UserId = $routeParams.UserId;
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
