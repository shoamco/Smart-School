/**
 * Created by כהן on 18/01/2017.
 */
app.directive("students", [ function ()
{
    return {
        restrict: 'E',
        controller: 'GradesCtrl',
        link: function (scope, elm, attr)
        {
 
		console.log("__________",scope.hello);
        }
    }
}]);