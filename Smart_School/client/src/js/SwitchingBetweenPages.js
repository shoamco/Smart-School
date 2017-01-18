// JavaScript source code


//var allstudent1=[];


var app = angular.module("myApp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                templateUrl: "classes.html",
                controller: "ClassesCtrl"
            })

        .when("/students", {
            templateUrl: "students.html",
            controller: "StudentsCtrl"
        })
        .when("/studentInformation",
            {
                templateUrl: "studentInformation.html",
                controller: "StudentsInformationCtrl"
            })


});
app.controller('MainPageCtrl', function ($scope) {

});

// app.controller('ClassesCtrl', ['$scope',function ($scope) {
//
//     $scope.list="hello";
//     //$scope.selectionGrade = function (myclass) {
//     console.log("------------------");
//     console.log("------------------",$scope.list);
//         /*if (myclass == "class_a") {
//             $scope.$parent.myStudent = classesA;
//         };
//         if (myclass == "class_b") {
//             $scope.$parent.myStudent = classesB;
//         };*/
//     //}
// }]);

app.directive("students", [ function ()
{
    return {
        restrict: 'E',
        controller: 'StudentsCtrl',
        link: function (scope, elm, attr)
        {
            console.log(scope.Students);
        }
    }
}]);

app.controller("StudentsCtrl", ['$scope', 'studentsService',
        function ($scope, studentsService)
    {
        var promise = studentsService.getStudents();
        promise.then(function (data)
        {
          $scope.allStudents=data.data;
        $scope.Students=[];
         //  allstudent1== data.data;
         //   alert( "ss"+allstudent1);
    //
    //       // $scope.selectionGrade = function (myclass) {
    //




               for (var i = 0; i < $scope.allStudents.length; i++) {
                   if ($scope.allStudents[i].ClassId == 1)
                       $scope.Students.push($scope.allStudents[i]);
             }



    //       // }
    //    //   alert("ddd"+$scope.Students); }
   })

    }]);
app.service("studentsService", ['$http', '$q', function ($http, $q)
{
    var deferred = $q.defer()
    $http.get("/students").then(function (data)
    {
        deferred.resolve(data);
    });
    this.getStudents = function ()
    {
        return deferred.promise;
    }
}]);


////////////////////////////////////////////////////////////
//classes
app.directive("classes", [ function ()
{
    return {
        restrict: 'E',
        controller: 'ClassesCtrl',
        link: function (scope, elm, attr)
        {
            console.log(scope.Classes);
        }
    }
}]);

app.controller("ClassesCtrl", ['$scope', 'classesService',
    function ($scope, classesService)
    {
        var promise = classesService.getClasses();
        promise.then(function (data)
        {
            $scope.Classes=data.data;
        //  $scope.selectionGrade = function (myclass) {
        //   $scope.$parent.allStudents=data.data;/////////////////////
        //   $scope.$parent.Students=[];
        //     // $scope.Students=[];
        //
        //      alert($scope.$parent.allStudents);
        // // console.log("class"+myclass);
        // for (var i = 0; i < $scope.$parent.allStudents.length; i++) {
        //         if (  $scope.$parent.allStudents[i].ClassId == myclass)
        //          $scope.$parent.Students.push( $scope.$parent.allStudents[i]);
        //    }
        //     }

        })

    }]);
app.service("classesService", ['$http', '$q', function ($http, $q)
{
    var deferred = $q.defer()
    $http.get("/classes").then(function (data)
    {
        deferred.resolve(data);
    });
    this.getClasses = function ()
    {
        return deferred.promise;
    }
}]);






















/*app.service('studentsService',function($http){
    
            return $http.get("/students").then(function(response){
                            return response.data;
                        })
        };
        
        return {
            getStudents: getStudents
        }

    });
*/


/*
 app.directive("maincontent",'$compile',function ('$compile')
 {
 return
 {
 restrict: 'A',
 link: function (scope, elm, attrs)
 {
 scope.selectionGrade = function (myclass)
 {
 if (myclass == "class_a")
 {
 $scope.myStudent = classesA;
 var mainContent     = elm.find('.nextCharacterContainer');
 movieList.append("<h1>{{myStudent.title}}<\/h1>");
 alert("class_a");
 }
 else if (myclass == "class_b")
 {
 $scope.myStudent = classesB;
 alert("class_b");
 }
 else
 alert("erro");
 }
 }
 }
 });
 */



