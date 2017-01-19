/**
 * Created by כהן on 19/01/2017.
 */

app.controller("CreatStudentsCtrl", function ($scope, $http) {

    $scope.SendData = function () {
        // use $.param jQuery function to serialize data from JSON
        var data = $.param({
            fName: $scope.FirstName,
            lName: $scope.LastName
        });

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        $http.post('/func', data, config)
            .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
    };

});