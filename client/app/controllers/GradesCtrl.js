
app.controller('GradesCtrl',function($scope,$routeParams,$rootScope,classesService,studentsService) {
    
    var current=localStorage.getItem('currentUser');
    if (current== "undefined"||current==""||current==null){
        window.open("http://localhost:5000/#/login", "_self");
    }
    else {
        var user=JSON.parse(current);
    }

    $scope.id = $routeParams.id;
    $scope.courseId=$routeParams.courseId;
   // alert($scope.AllStudents);
    var promise = classesService.getClasses();
    var promise2=studentsService.getStudents()
    promise.then(function (data)
    {
        $scope.Classes=data.data;
        for (var i = 0; i < $scope.Classes.length; i++) 
        {
            if ($scope.Classes[i].ClassId ==  $scope.id) 
            {
                $scope.MyStudents = $scope.Classes[i].Students;
                $scope.ALLCourse=$scope.Classes[i].Courses;
            }
        }
        $scope.MyCourse=[];///all course of this teacher
        for (var i = 0; i < $scope.ALLCourse.length; i++) 
        {
            if ($scope.ALLCourse[i].TeacherId == user.UserId)
            {////arry of course
                $scope.MyCourse.push($scope.ALLCourse[i]);
            }
        }
        promise2.then(function (data)
        {
            $scope.AllStudents=data.data;
            $scope.findGread = function(studentid,courseid) 
            {///the function get student and course and return gread of cours
                for (var i = 0; i < $scope.AllStudents.length; i++) 
                {
                    if ($scope.AllStudents[i].StudentId ==  studentid) 
                    {
                        for (var j = 0; j < $scope.AllStudents[i].Courses.length; j++) 
                        {
                           if ($scope.AllStudents[i].Courses[j].CourseId ==courseid) {
                            return $scope.AllStudents[i].Courses[j].Grade;
                        }
                    }
                }
            }

        }

        $scope.findEvaluation = function(studentid,courseid) 
        {///the function get student and course and return Evaluation of cours
            for (var i = 0; i < $scope.AllStudents.length; i++) 
            {
                if ($scope.AllStudents[i].StudentId ==  studentid) 
                {
                    for (var j = 0; j < $scope.AllStudents[i].Courses.length; j++) 
                    {
                        if ($scope.AllStudents[i].Courses[j].CourseId ==courseid) 
                        {
                            return $scope.AllStudents[i].Courses[j].Evaluation;
                        }
                    }
                }
            }
        }

        $scope.findConfirmEducator = function(courseid) 
        {///the function get student and course and return Evaluation of cours
            for (var i=0;i<$scope.ALLCourse.length;i++)
            {
                if($scope.ALLCourse[i].CourseId==courseid)
                    return $scope.ALLCourse[i].ConfirmEducator;
                }
            }
            $scope.updateGreads = function() 
            {

                var StudentGreads2=[];
              //  alert(myGrade2.Grade.length);
                for(var i=0;i<myGrade2.Grade.length;i++)
                {
                    StudentGreads2.push({"StudentId":$scope.MyStudents[i].StudentId,"Grade":myGrade2.Grade[i].value,"Evaluation":myGrade2.Evaluation[i].value});
                   /// alert($scope.MyStudents[i].StudentId+" "+myGrade2.Grade[i].value+" "+myGrade2.Evaluation[i].value);
                }
             //   alert("StudentGreads2"+StudentGreads2);
                if (window.XMLHttpRequest){
                    var xmlhttp = new XMLHttpRequest();
                }else{
                    var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                var document =
                {
                    "StudentGreads":StudentGreads2,
                    "CourseId":$scope.courseId,
                    "ClassId": $scope.id
                };
                xmlhttp.onreadystatechange = function () 
                {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        $scope.message1 =xmlhttp.responseText;
                        $scope.$apply();
                    }
                }
                xmlhttp.open('POST', 'http://localhost:5000/updateGreads');
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                xmlhttp.send(JSON.stringify(document));
            }

        });
    });
});