//var app=angular.m

app.controller('loginCtrl',function($scope,$routeParams,staffService) {
    var promise = staffService.login();
    promise.then(function (data)
{
$scope.User=data.data;

})
});
