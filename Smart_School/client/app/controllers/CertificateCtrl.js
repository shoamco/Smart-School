

app.controller('CertificateCtrl',function($scope,$routeParams) {


   /* var current=localStorage.getItem('currentUser');
    if (current== "undefined"||current==""||current==null){
        window.open("http://localhost:5000/#/login", "_self");
    }
    else {

        var user=JSON.parse(current);

        if(user.Type!=5&&user.Type!=4)
            window.open("http://localhost:5000/#/", "_self");
    }*/
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
              //   xmlhttp.response.
              //   xmlhttp.responseXML;
              //  alert(xmlhttp.res);
             //  alert(xmlhttp.response);


            }
        }


        xmlhttp.open('GET', 'http://localhost:5000/admin/download');
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xmlhttp.send();
            }


$scope.Certificate=function () {


   // alert("admin/Certificate");
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

           // alert( $scope.message1);
            $scope.$apply();


        }
    }

    xmlhttp.open('POST', 'http://localhost:5000/admin/Certificate');
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xmlhttp.send(JSON.stringify(document));
    //  $window.reload();


}


    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
    download('demo.text', 'Hello world!');
   // download("hello world", "dlText.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");

  // download('demo2.docx', 'Hello world!');



});