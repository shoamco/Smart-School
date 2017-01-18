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
