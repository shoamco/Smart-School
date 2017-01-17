/*
* Created by נעמי יונג on 17/01/2017.
*/

var http = require('http'),
    fs = require('fs'),
    url = require('url');

function read(f) {
    return fs.readFileSync(f).toString();
}
function include(f) {
    eval.apply(global, [read(f)]);
}

include('../mongoose3/db.js');

var server = http.createServer(function (req,res) {

    var url_parts = url.parse(req.url, true);

    var body = '';

    if (url_parts.pathname == '/') {
        fs.readFile('./teamMember.html', function (error, data) {
            console.log('Serving the teamMember.html');
            res.end(data);
        });
    }
    if (url_parts.pathname == '/newMember') {
        newMember(res,url_parts);
    }
});
server.listen(8080);
console.log('Server listenning at localhost:8080');

function  newMember(res,url_parts) {
    CreateStaff(url_parts.query.id,url_parts.query.firstName2,url_parts.query.LastName2,url_parts.query.studentid,url_parts.query.syudentclass);
}

