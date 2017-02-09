/**
 * Created by כהן on 25/01/2017.
 */
app.controller('ConfirmCoursesCtrl',function($scope,$routeParams,classesService,studentsService) {
    $scope.id = $routeParams.id;

    $scope.courseId=$routeParams.courseId;

    var current=localStorage.getItem('currentUser');
    if (current== "undefined"||current==""||current==null){
        window.open("http://localhost:5000/#/login", "_self");
    }
    else {
        var user=JSON.parse(current);
        $scope.user=user;

    }

    var promise = classesService.getClasses();
    var promise2=studentsService.getStudents();
    promise.then(function (data)
    {
        $scope.Classes=data.data;


        for (var i = 0; i < $scope.Classes.length; i++) {
            if ($scope.Classes[i].ClassId ==  $scope.id) {
                $scope.MyStudents = $scope.Classes[i].Students;
                $scope.ALLCourse=$scope.Classes[i].Courses;
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
            $scope.findConfirmPrincipal=function(courseid)
            {
                for (var i=0;i<$scope.ALLCourse.length;i++)
                {
                    if($scope.ALLCourse[i].CourseId==courseid)
                        return $scope.ALLCourse[i].ConfirmPrincipal;
                }

            }

            $scope.findConfirmEducator = function(courseid) {///

                for (var i=0;i<$scope.ALLCourse.length;i++)
                {
                    if($scope.ALLCourse[i].CourseId==courseid)
                        return $scope.ALLCourse[i].ConfirmEducator;
                }


            }
            $scope.findConfirmCoordinator = function(courseid) {///

                for (var i=0;i<$scope.ALLCourse.length;i++)
                {
                    if($scope.ALLCourse[i].CourseId==courseid)
                        return $scope.ALLCourse[i].ConfirmCoordinator;
                }


            }
            $scope.findConfirm = function(courseid) {///

                for (var i=0;i<$scope.ALLCourse.length;i++)
                {
                    if($scope.ALLCourse[i].CourseId==courseid) {
                        if(user.Type==2)
                        return $scope.ALLCourse[i].ConfirmEducator;
                        else if(user.Type==3)
                            return $scope.ALLCourse[i].ConfirmCoordinator;
                        else if(user.Type==4)
                            return $scope.ALLCourse[i].ConfirmPrincipal;
                    }
                }


            }
            $scope.findConfirmAboveMe= function(courseid) {
                for (var i=0;i<$scope.ALLCourse.length;i++)
                {
                    if($scope.ALLCourse[i].CourseId==courseid) {
                        if(user.Type==2)
                            return $scope.ALLCourse[i].ConfirmCoordinator;
                        else if(user.Type==3)
                            return $scope.ALLCourse[i].ConfirmPrincipal;
                        else if(user.Type==4)
                            return 0;
                    }
                }
            }


            $scope.findConfirmUnderMe= function(courseid) {
                for (var i=0;i<$scope.ALLCourse.length;i++)
                {
                    if($scope.ALLCourse[i].CourseId==courseid) {
                        if(user.Type==4)///Principal
                        {
                            if($scope.ALLCourse[i].ConfirmTeacher==0)
                                $scope.message2 = "המורה עדין לא עידכן ציונים בקורס זה";
                            else if($scope.ALLCourse[i].ConfirmEducator==0)
                                 $scope.message2="המחנך עדין לא אישר קורס זה";
                            else if($scope.ALLCourse[i].ConfirmCoordinator==0)
                                $scope.message2="הרכז שכבה עדין לא אישר קורס זה";
                            return $scope.ALLCourse[i].ConfirmCoordinator*$scope.ALLCourse[i].ConfirmEducator*$scope.ALLCourse[i].ConfirmTeacher;
                        }
                        else if(user.Type==3) {//Coordinator
                            if ($scope.ALLCourse[i].ConfirmTeacher == 0)
                                $scope.message2 = "המורה עדין לא עידכן ציונים בקורס זה";
                            else if ($scope.ALLCourse[i].ConfirmEducator == 0)
                                $scope.message2 = "המחנך עדין לא אישר קורס זה";
                           // alert($scope.ALLCourse[i].ConfirmEducator*$scope.ALLCourse[i].ConfirmTeacher);
                            return $scope.ALLCourse[i].ConfirmEducator* $scope.ALLCourse[i].ConfirmTeacher;
                        }
                    else if(user.Type==2) {//Educator
                            if ($scope.ALLCourse[i].ConfirmTeacher == 0)
                                $scope.message2 = "המורה עדין לא עידכן ציונים בקורס זה";
                            return $scope.ALLCourse[i].ConfirmTeacher;
                        }
                    }
                }
            }
/////need  change to globl
            $scope.confirmCourse = function() {
                // alert("in client confirmCourse");

                // alert(myGread.Gread[0].value+ " "+myGread.Evaluation[0].value+" ");
                var StudentGreads1=[];
                // console.log(myGread);
                for(var i=0;i<myGrade.Grade.length;i++)
                {StudentGreads1.push({"StudentId":$scope.MyStudents[i].StudentId,"Grade":myGrade.Grade[i].value,"Evaluation":myGrade.Evaluation[i].value});

                    // alert("ID"+$scope.MyStudents[i].StudentId+ " "+myGrade.Grade[i].value+" "+myGrade.Evaluation[i].value);
                    // alert( );
                }
                if (window.XMLHttpRequest)
                    var xmlhttp = new XMLHttpRequest();
                else
                    var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");


                var document =
                    {


                        "StudentGreads":StudentGreads1,

                        "CourseId":$scope.courseId,
                        "ClassId": $scope.id,
                       "Type": user.Type
                    };

                xmlhttp.onreadystatechange = function () {

                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        $scope.message1 =xmlhttp.responseText;

                        //alert( $scope.message1);
                        $scope.$apply();


                    }
                }

                xmlhttp.open('POST', 'http://localhost:5000/confirmCourse');
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                xmlhttp.send(JSON.stringify(document));

            }


        });
        $scope.cancelConfirmCourse=function () {
          //  alert("in client confirmCourse");


            if (window.XMLHttpRequest)
                var xmlhttp = new XMLHttpRequest();
            else
                var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");


            var document =
                {


                    "CourseId":$scope.courseId,
                    "ClassId": $scope.id,
                    "Type": user.Type
                };

            xmlhttp.onreadystatechange = function () {

                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    $scope.message1 =xmlhttp.responseText;

                    //alert( $scope.message1);
                    $scope.$apply();


                }
            }

            xmlhttp.open('POST', 'http://localhost:5000/cancelConfirmCourse');
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
            xmlhttp.send(JSON.stringify(document));



        }
    });
});