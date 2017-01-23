/**
 * Created by כהן on 18/01/2017.
 */
app.service("staffService", ['$http', '$q', function ($http, $q)
{
    var deferred = $q.defer()
    $http.get("/staff").then(function (data)
    {
        deferred.resolve(data);
    });
    this.getStaff = function ()
    {
        return deferred.promise;
    }
    this.login = function (form)
    {
        alert(form);
        $http.post("/login",form).then(function (data)
        {

            deferred.resolve(data);
        });
    }
}]);