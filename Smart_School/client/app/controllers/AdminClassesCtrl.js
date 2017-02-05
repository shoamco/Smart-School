/**
 * Created by כהן on 19/01/2017.
 */
/**
 * Created by כהן on 19/01/2017.
 */


app.controller('AdminClassesCtrl',function($scope,$routeParams,classesService) {
var current=JSON.parse(localStorage.getItem('currentUser'));
    if (current==null){
        window.open("http://localhost:5000/#/login", "_self");
    }
    else if(current[UserId]!=5){
        window.open("http://localhost:5000/#", "_self");
    }

    var promise = classesService.getClasses();
    promise.then(function (data)
    {
        $scope.AllClasses=data.data;


    });


});


