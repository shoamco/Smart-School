// JavaScript source code

//var student = [{ "name": "aaa", "class": "class_a" }, { "name": "b", "class": "class_b" }];
//var class_b = [{ "name": "aaa", "class": "class_a" }, { "name": "b", "class": "class_b" }];
//var class_a = ["s1","s2","s3"];
//var classes = ["class_a", "class_b"];


var staff = '[{"Name": "avi","Type":"teacher"},{"Name": "sara","Type":"educator"}]';
var classes = '[ {"classId":"0", "ClassName": "class_a" ,"TeacherName": "avi","NumStudent":"3","imgSrc":"a.jpg"},{ "classId":"1", "ClassName": "class_b","TeacherName": "avi","NumStudent":"2","imgSrc":"a.jpg" }]';
var class_a = '[{"FirstName":"Avi","LastName":"Levi", "img":"1.jpg"},{"FirstName":"Ben","LastName":"Cohen","img":"2.jpg"},{"FirstName":"David","LastName":"Lori","img":"3.jpg"},{"FirstName":"Chani","LastName":"Simon", "img":"4.jpg"}]';
var class_b = '[{"FirstName":"Avigdor","LastName":"Levi","img":"2.jpg"},{"FirstName":"Beni","LastName":"Feldman","img":"3.jpg"},{"FirstName":"Oz","LastName":"Perlman", "img":"1.jpg"},{"FirstName":"Sara","LastName":"Shiff", "img":"5.jpg"}]';


var allClasses = JSON.parse(classes);
var classesA = JSON.parse(class_a);
var classesB = JSON.parse(class_b);



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

});
app.controller('MainPageCtrl', function ($scope) {
    $scope.list_classes = allClasses;
});

app.controller('ClassesCtrl', ['$scope',function ($scope) {

    $scope.selectionGrade = function (myclass) {

        if (myclass == "class_a") {
            $scope.$parent.myStudent = classesA;
        };
        if (myclass == "class_b") {
            $scope.$parent.myStudent = classesB;
        };
    }
}]);
app.controller('StudentsCtrl', ['$scope', function ($scope) {

   /* $scope.Grade = function (classes) {
        $scope.$parent.myStudent = classes;
    
    }*/
}]);


app.directive("students", [ function ()
{
        return {
            restrict: 'E',
            controller: 'StudentsCtrl',
            link: function (scope, elm, attr)
            {
                console.log(scope.myStudent);
            }
        }
}]);

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



