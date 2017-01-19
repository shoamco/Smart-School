/**
 * Created by כהן on 18/01/2017.
 */
app.directive("staff", [ function ()
{
    return {
        restrict: 'E',
        controller: 'AdminStaffCtrl',
        link: function (scope, elm, attr)
        {
            console.log(scope.Classes);
        }
    }
}]);