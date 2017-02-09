/**
 * Created by כהן on 18/01/2017.
 */
app.service("gradeService", ['$http', '$q', function ($http, $q)
{
    var deferred = $q.defer()

    this.updateStudents = function (form)
    {
       alert(form);
        $http.post("/update",form).then(function (data)
        {

            deferred.resolve(data);
        });
    }
}]);