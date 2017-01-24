/**
 * Created by כהן on 18/01/2017.
 */
app.controller('ClassCtrl',function($scope,$routeParams,classesService,usersService) {
    $scope.id = $routeParams.id;
    var promise = classesService.getClasses();
    promise.then(function (data)
    {
        $scope.Classes=data.data;


        for (var i = 0; i < $scope.Classes.length; i++) {
            if ($scope.Classes[i].ClassId ==  $scope.id)
                $scope.MyClass = $scope.Classes[i].Students;
        }


    });
    var promise = usersService.getUsers();
     promise.then(function (data)
    {
        $scope.Users=data.data;
        console.log($scope.Users);

    });

});