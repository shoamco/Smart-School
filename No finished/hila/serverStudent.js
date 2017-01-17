/**

 * Created by נעמי יונג on 17/01/2017.
 */
var http = require('http'),
    fs = require('fs'),
    url = require('url');

var server = http.createServer(function (req,res) {

    var url_parts = url.parse(req.url, true);

    var body = '';

    if (url_parts.pathname == '/') {
        fs.readFile('./studentPage.html', function (error, data) {
            console.log('Serving the studentPage.html');
            res.end(data);
        });
    }
    if (url_parts.pathname == '/newStudent') {
        newStudent(res,url_parts);
    }
});
server.listen(8080);
console.log('Server listenning at localhost:8080');

function  newStudent(res,url_parts) {
    createStudent(url_parts.query.id,url_parts.query.firstName,url_parts.query.LastName,url_parts.query.studentclass);
}

