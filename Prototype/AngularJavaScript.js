
var scotchApp = angular.module('scotchApp', ['ngRoute']);


scotchApp.config(function ($routeProvider) {
    $routeProvider

        
        .when('/home', {
            templateUrl: 'pages/home.html',
            controller: 'mainController'
        })

        
        .when('/project', {
            templateUrl: 'pages/project.html',
            controller: 'projectController'
        })

       
        .when('/contact', {
            templateUrl: 'pages/contact.html',
            controller: 'contactController',
        })
    .otherwise({
        redirectTo: '/home'
    });
});


scotchApp.controller('mainController', function ($scope) {
    
    $scope.message = 'this is home page';
});

scotchApp.controller('projectController', function ($scope) {
    $scope.message = 'this is project page.';
});

scotchApp.controller('contactController', function ($scope) {
    $scope.message = 'this is contact page';
});