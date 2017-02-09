/**
 * Created by כהן on 18/01/2017.
 */
app.service("classesService", ['$http', '$q', function ($http, $q)
{
    var deferred = $q.defer()
    $http.get("/classes").then(function (data)
    {
        deferred.resolve(data);
    });
    this.getClasses = function ()
    {
        return deferred.promise;
    }
}]);