/**
 * Created by כהן on 28/01/2017.
 */
/**
 * Created by כהן on 26/01/2017.
 */

app.controller('CertificateCtrl',function($scope,$routeParams) {
$scope.Certificate=function () {


   alert("in Certificate client");


    if (window.XMLHttpRequest)
        var xmlhttp = new XMLHttpRequest();
    else
        var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

    var document =
        {
        };

    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            $scope.message1 =xmlhttp.responseText;

          //  alert($scope.message1);
            $scope.$apply();


        }
    }

    xmlhttp.open('POST', 'http://localhost:5000/certificate');
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xmlhttp.send(JSON.stringify(document));
    //  $window.reload();
}





});