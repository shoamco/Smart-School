
app.controller('GradesCtrl',function($scope,$routeParams,classesService,studentsService) {
    $scope.id = $routeParams.id;


   // alert($scope.AllStudents);
    var promise = classesService.getClasses();
    var promise2=studentsService.getStudents()
    promise.then(function (data)
    {
        $scope.Classes=data.data;


        for (var i = 0; i < $scope.Classes.length; i++) {
            if ($scope.Classes[i].ClassId ==  $scope.id) {
                $scope.MyStudents = $scope.Classes[i].Students;
                $scope.ALLCourse=$scope.Classes[i].Courses;
            }
        }
        $scope.MyCourse=[];///all course of this techear
        for (var i = 0; i < $scope.ALLCourse.length; i++) {
            if ($scope.ALLCourse[i].TeacherName ==  "אבי כהן") {////arry of course
                $scope.MyCourse.push($scope.ALLCourse[i]);
            }
        }




        promise2.then(function (data)
        {
            $scope.AllStudents=data.data;



   $scope.findGread = function(studentid,courseid) {///the function get student and course and return gread of cours

        for (var i = 0; i < $scope.AllStudents.length; i++) {

            if ($scope.AllStudents[i].StudentId ==  studentid) {

                for (var j = 0; j < $scope.AllStudents[i].Courses.length; j++) {

                    if ($scope.AllStudents[i].Courses[j].CourseId ==courseid) {

                        return $scope.AllStudents[i].Courses[j].Grade;

                    }
                }
            }
        }

    }



            $scope.findEvaluation = function(studentid,courseid) {///the function get student and course and return Evaluation of cours


                for (var i = 0; i < $scope.AllStudents.length; i++) {

                    if ($scope.AllStudents[i].StudentId ==  studentid) {

                        for (var j = 0; j < $scope.AllStudents[i].Courses.length; j++) {

                            if ($scope.AllStudents[i].Courses[j].CourseId ==courseid) {

                                return $scope.AllStudents[i].Courses[j].Evaluation;

                            }
                        }
                    }
                }
            }

        });






});



});