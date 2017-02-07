/**
 * Created by כהן on 26/01/2017.
 */
app.controller('SwitchClassesCtrl',function($scope,$routeParams,classesService,studentsService) {
$scope.switchClasses= function(){
    alert("switchClasses");


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
            $scope.$apply();
            //alert(xmlhttp.responseText);


        }
    }

    xmlhttp.open('POST', 'http://localhost:5000/switchClasses');
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xmlhttp.send(JSON.stringify(document));
}
});
