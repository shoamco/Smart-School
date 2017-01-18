/**
 * Created by כהן on 18/01/2017.
 */
app.controller('ClassCtrl',function($scope,$routeParams,classesService) {
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

});