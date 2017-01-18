/**
 * Created by כהן on 18/01/2017.
 */
app.service("gradeService", ['$http', '$q', function ($http, $q)
{
    var deferred = $q.defer()

    this.updateStudents = function (form)
    {
        console.log(form);
        $http.post("/'/classes/{{classId}}/grades'",form).then(function (data)
        {

            deferred.resolve(data);
        });
    }
}]);