// JavaScript source code
var app = angular.module("myApp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                templateUrl: "classes.html",
                controller: "MainPageControl"
            })

        .when('/classes',
            {
                templateUrl: "classes.html",
                controller: "ClassesCtrl"
            })

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
        .when('/classes/:id/grades/:courseId',
            {
                templateUrl: "grades.html",
                controller: "GradesCtrl"
            })
        .when('/classes/:id/courses',
            {
                templateUrl: "myCourses.html",
                controller: "GradesCtrl"
            })


        .when('/classes/:id/confirmCourses',
            {
                templateUrl: "allConfirmCourses.html",
                controller: "ConfirmCoursesCtrl"
            })
        .when('/classes/:id/confirmCourses/:courseId',
            {
                templateUrl: "confirmCourses.html",
                controller: "ConfirmCoursesCtrl"
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
              //  controller: "AdminClasssesCtrl"
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

        .when('/admin/switchClasses',
            {
                templateUrl: "switchClasses.html",
                controller: "SwitchClassesCtrl"
            })
        .when('/admin/Certificate',
            {
                templateUrl: "Certificate.html",
                controller: "CertificateCtrl"
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
        .when('/changePassword',
            {
                templateUrl: "changePassword.html",
                controller: "loginCtrl"
            })
        // .when('/admin/students/updateStudents',
        //     {
        //         templateUrl: "updateStudents.html",
        //         controller: "AdminStudentsCtrl"
        //     })
        .when('/admin/students/updateStudent/:studentId',///
            {
                templateUrl: "updateStudent.html",
                controller: "updateStudentCtrl"
            })
        .when('/admin/staff/updateStaff/:UserId',
            {
                templateUrl: "updateStaff.html",
                controller: "updateStaffCtrl"
            })

        .when('/admin/classes/creatClass',
            {
                templateUrl: "creatClass.html",
                controller: "AdminClassesCtrl"
            })
        .when('/login',
            {
                templateUrl: "login.html",
                controller: "loginCtrl"
            })
        .when('/admin/classes/updateClass/:classId',///
        {
            templateUrl: "updateClass.html",
            controller: "updateClassCtrl"
        })
        .when('/admin/classes/updateClass/:classId/updateCourse/:courseId',///
            {
                templateUrl: "updateCourse.html",
                controller: "updateCourseCtrl"
            })
    .when('/admin/classes/updateClass/:classId/AddCourse',///
        {
            templateUrl: "AddCourse.html",
             controller: "AddCourseCtrl"
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
