/**
 * Created by כהן on 19/01/2017.
 */
/**
 * Created by כהן on 19/01/2017.
 */


app.controller('AdminCtrl',function($scope,$routeParams,classesService) {
    $scope.id = $routeParams.id;
    var promise = classesService.getClasses();
    promise.then(function (data)
    {
        $scope.AllClasses=data.data;


    });

});