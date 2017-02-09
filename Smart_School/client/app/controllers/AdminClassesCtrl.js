/**
 * Created by כהן on 19/01/2017.
 */
/**
 * Created by כהן on 19/01/2017.
 */


app.controller('AdminClassesCtrl',function($scope,$routeParams,classesService) {
    // var current=localStorage.getItem('currentUser');
    // if (current== "undefined"||current==""||current==null){
    //     window.open("http://localhost:5000/#/login", "_self");
    // }
    // else {
    //     var user=JSON.parse(current);
    //
    //     if(user.type!=5&&user.type!=4)
    //     window.open("http://localhost:5000/#/", "_self");
    // }

    var promise = classesService.getClasses();
    promise.then(function (data)
    {
        $scope.AllClasses=data.data;


    });


});


