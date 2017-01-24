/**
 * 
 */
app.service("usersService", ['$http', '$q', function ($http, $q)
{
    var deferred = $q.defer()
    $http.get("/users").then(function (data)
    {
        deferred.resolve(data);
    });
    this.getUsers = function ()
    {
        return deferred.promise;
    }

  /* this.login = function (form)
    {
        alert(form);
        $http.post("/login",form).then(function (data)
        {

            deferred.resolve(data);
        });
    }*/
}]);
