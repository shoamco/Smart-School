/**
 * Created by נעמי יונג on 07/01/2017.

var http = require('http'),
    fs = require('fs'),
    url = require('url');

var server = http.createServer(function (req,res) {

    var url_parts = url.parse(req.url, true);

    var body = '';

    if (url_parts.pathname == '/') {
        fs.readFile('./google_login.html', function (error, data) {
            console.log('Serving the page login.html');
            res.end(data);
        });
    }

});
 server.listen(8080);
 */

var http = require('http'),
    fs = require('fs'),
    url = require('url');

var server = http.createServer(function (req,res){

    var url_parts = url.parse(req.url,true);

    var body = '';
    if(url_parts.pathname == '/')
    {
        fs.readFile('./google_login.html',function(error,data){
            console.log('Serving the page form.html');
            res.end(data);
        });
    }
    else if(url_parts.pathname == '/addArtistSong')
    {
        console.log('Serving the add Artist Song.');
        addArtistSong(res,url_parts);
    }
    else if(url_parts.pathname == '/deleteArtistSong')
    {
        console.log('Serving the Delete Artist Song.');
        deleteArtistSong(res,url_parts);
    }
    else if(req.method=='GET' && req.url=='/home/list')
    {
        console.log('Serving the Get List Artist.');
        getListArtists(res,url_parts);
    }

});
server.listen(8080);

console.log('Server listenning at localhost:8080');
    function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}