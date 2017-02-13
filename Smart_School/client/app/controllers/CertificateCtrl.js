

    app.controller('CertificateCtrl',function($scope,$routeParams) {
            $scope.done=0;



        $scope.download=function () {
    if(  $scope.done==1)
            window.open('http://localhost:5000/admin/download', "_self");
    else
        $scope.message1 ="לא יצרת תעודות";
                }


   /* var current=localStorage.getItem('currentUser');
    if (current== "undefined"||current==""||current==null){
        window.open("http://localhost:5000/#/login", "_self");
    }
    else {

        var user=JSON.parse(current);

        if(user.Type!=5&&user.Type!=4)
            window.open("http://localhost:5000/#/", "_self");
    }*/



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
                $scope.done=1;
               // alert( $scope.message1);
                $scope.$apply();


            }
        }

        xmlhttp.open('POST', 'http://localhost:5000/admin/Certificate');
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xmlhttp.send(JSON.stringify(document));
        //  $window.reload();


    }


        // function download(filename, text) {
        //     var element = document.createElement('a');
        //     element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        //     element.setAttribute('download', filename);
        //
        //     element.style.display = 'none';
        //     document.body.appendChild(element);
        //
        //     element.click();
        //
        //     document.body.removeChild(element);
        // }
        // download('demo.text', 'Hello world!');
       // download("hello world", "dlText.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");

      // download('demo2.docx', 'Hello world!');



    });