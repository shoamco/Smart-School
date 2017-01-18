/**
 * Created by כהן on 18/01/2017.
 */
app.directive("students", [ function ()
{
    return {
        restrict: 'E',
        controller: 'StudentsCtrl',
        link: function (scope, elm, attr)
        {
            console.log(scope.Students);
        }
    }
}]);