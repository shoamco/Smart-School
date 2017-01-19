// JavaScript source code
var app = angular.module("myApp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                templateUrl: "classes.html",
                controller: "ClassesCtrl"
            })

        .when('/classes',
            {
                templateUrl: "classes.html",
                controller: "ClassesCtrl"
            })
        // $routeparams in controller
        .when('/classes/:id',
            {
                templateUrl: "class.html",
                controller: "ClassCtrl"
            })
        .when('/classes/:id/students',
            {
                templateUrl: "students.html",
                controller: "ClassCtrl"
            })
        .when('/classes/:id/grades',
            {
                templateUrl: "grades.html",
                controller: "GradesCtrl"
            })
        .when("/classes/:classId/students/:studentId", {
            templateUrl: "student.html",
            controller: "StudentCtrl"
        })
        .when('/classes/:id/class',
            {
                templateUrl: "class.html",
                controller: "ClassCtrl"
            })
////////////////////////////////admin side
        .when('/admin',
            {
                templateUrl: "admin.html",
              //  controller: "AdminClassesCtrl"
            })
        .when('/admin/classes',
       {
           templateUrl: "adminClasses.html",
             controller: "AdminClassesCtrl"
       })
        .when('/admin/students',
            {
                templateUrl: "adminStudents.html",
                controller: "AdminStudentsCtrl"
            })
        .when('/admin/staff',
            {
                templateUrl: "adminStaff.html",
                controller: "AdminStaffCtrl"
            })
        .when('/admin/courses',
            {
                templateUrl: "adminCourses.html",
                controller: "AdminCoursesCtrl"
            })
        .when('/admin/students/creatStudent',
            {
                templateUrl: "creatStudent.html",
                controller: "CreatStudentsCtrl"
            })
        .when('/admin/staff/creatStaff',
            {
                templateUrl: "creatStaff.html",
                controller: "AdminStaffCtrl"
            })
        .when('/admin/students/updateStudents',
            {
                templateUrl: "updateStudents.html",
                controller: "AdminStudentsCtrl"
            })
        .when('/admin/staff/updateStaff',
            {
                templateUrl: "updateStaff.html",
                controller: "AdminStaffCtrl"
            })
        .when('/admin/classes/updateClasses',
            {
                templateUrl: "updateClasses.html",
                controller: "AdminClassesCtrl"
            })
        .when('/admin/classes/creatClass',
            {
                templateUrl: "creatClass.html",
                controller: "AdminClassesCtrl"
            })

    // when('/admin/staff/creatStudent',
    //     {
    //         templateUrl: "creatStaff.html",
    //         controller: "AdminStudentsCtrl"
    //     })

        // .when('/admin/allClasses',
        //     {
        //         templateUrl: "adminClasses.html",
        //         controller: "AdminCtrl"
        //     })
        // .when('/admin/allClasses/students',
        //     {
        //         templateUrl: "students.html",
        //         controller: "ClassCtrl"
        //     })
        // .when('/admin/creatStudent',
        //     {
        //         templateUrl: "creatStudent.html",
        //         controller: "AdminCtrl"
        //     })
        // .when('/admin/creatStaff',
        //     {
        //         templateUrl: "creatStaff.html",
        //         controller: "AdminCtrl"
        //     })
        // .when('/admin/searchStudent',
        //     {
        //         templateUrl: "searchStudent.html",
        //         controller: "AdminCtrl"
        //     })
        // .when('/admin/searchStaff',
        //     {
        //         templateUrl: "searchStaff.html",
        //         controller: "AdminCtrl"
        //     })
});
