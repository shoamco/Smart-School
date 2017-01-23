/**
 * Created by נעמי יונג on 23/01/2017.
 */
//var app=angular.m


app.controller('loginCtrl',function($scope,$routeParams,staffService) {
    var promise = staffService.login();
    promise.then(function (data)
    {
        $scope.User=data.data;

    });

});