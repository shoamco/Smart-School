

app.controller('CertificateCtrl',function($scope,$routeParams) {


    $scope.download=function () {
var par=2;
alert("download");

        if (window.XMLHttpRequest)
            var xmlhttp = new XMLHttpRequest();
        else
            var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");



        xmlhttp.onreadystatechange = function () {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
     //$scope.message1 =xmlhttp.response;
               // xmlhttp.responseText;
           //     alert("yes");
              //  $scope.$apply();
                xmlhttp.response.
                xmlhttp.responseXML;
              //  alert(xmlhttp.res);
             //  alert(xmlhttp.response);


            }
        }


        xmlhttp.open('GET', 'http://localhost:5000/admin/download');
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xmlhttp.send();
            }


$scope.Certificate=function () {





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


    xmlhttp.open('POST', 'http://localhost:5000/admin/Certificate');
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xmlhttp.send(JSON.stringify(document));
    //  $window.reload();
}





});