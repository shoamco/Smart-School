/**
 * Created by כהן on 18/01/2017.
 */
app.directive("classes", [ function ()
{
    return {
        restrict: 'E',
        controller: 'ClassesCtrl',
        link: function (scope, elm, attr)
        {
            console.log(scope.Classes);
        }
    }
}]);