
app.controller('StudentCtrl',function($scope,$routeParams,studentsService) {
    $scope.StudentId = $routeParams.studentId;
    var promise = studentsService.getStudents();
    promise.then(function (data)
    {
        $scope.Students=data.data;


        for (var i = 0; i < $scope.Students.length; i++) {
            if ($scope.Students[i].StudentId ==  $scope.StudentId)
                $scope.student = $scope.Students[i];
        }


    });

});
