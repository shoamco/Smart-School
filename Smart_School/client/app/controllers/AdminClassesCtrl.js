/**
 * Created by כהן on 19/01/2017.
 */
/**
 * Created by כהן on 19/01/2017.
 */


app.controller('AdminClassesCtrl',function($scope,$routeParams,classesService) {

    var promise = classesService.getClasses();
    promise.then(function (data)
    {
        $scope.AllClasses=data.data;


    });


});


