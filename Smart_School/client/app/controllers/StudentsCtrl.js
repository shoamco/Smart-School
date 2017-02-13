/**

 */
app.controller("StudentsCtrl", ['$scope', 'studentsService',
    function ($scope, studentsService)
    {
        var promise = studentsService.getStudents();
        promise.then(function (data)
        {
           /* $scope.allStudents=data.data;
            $scope.Students=[];
            for(var i = 0; i < $scope.allStudents.length; i++) {
                if ($scope.allStudents[i].ClassId == 1)
                    $scope.Students.push($scope.allStudents[i]);
            }
*/
        })
}]);