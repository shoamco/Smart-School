
app.controller('GradesCtrl',function($scope,$routeParams,classesService) {
    $scope.id = $routeParams.id;
    var promise = classesService.getClasses();
    promise.then(function (data)
    {
        $scope.Classes=data.data;


        for (var i = 0; i < $scope.Classes.length; i++) {
            if ($scope.Classes[i].ClassId ==  $scope.id) {
                $scope.MyStudents = $scope.Classes[i].Students;
                $scope.ALLCourse=$scope.Classes[i].Courses;
            }
        }
        for (var i = 0; i < $scope.ALLCourse.length; i++) {
            if ($scope.ALLCourse[i].TeacherName == "חנן ירושלמי") {
                $scope.MyCourse=$scope.ALLCourse[i];
            }
        }





   $scope.findGread = function(studentid,courseid) {

        for (var i = 0; i < $scope.MyStudents.length; i++) {
            if ($scope.MyStudents[i].StudentId ==  studentid) {

                for (var j = 0; j < $scope.MyStudents.Courses.length; i++) {
                    if ($scope.MyStudents.Courses.CourseId[i] ==courseid) {
                        return $scope.MyStudents.Courses.CourseId[i].Grade;
                    }
                }
            }
        }
    }
    var a=findGread(101,10);
        alert(a);
});
});
