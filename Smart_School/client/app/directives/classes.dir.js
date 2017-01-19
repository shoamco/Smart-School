/**

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