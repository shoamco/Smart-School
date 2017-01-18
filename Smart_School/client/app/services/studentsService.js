/**
 * Created by כהן on 18/01/2017.
 */
app.service("studentsService", ['$http', '$q', function ($http, $q)
{
    var deferred = $q.defer()
    $http.get("/students").then(function (data)
    {
        deferred.resolve(data);
    });
    this.getStudents = function ()
    {
        return deferred.promise;
    }
}]);
