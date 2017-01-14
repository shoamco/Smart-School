var http = require('http'),
    fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    url = require('url'),
    mongoose = require("mongoose");
var app = express();
var port = 5000;


// APP CONFIGURATION------------------------------------------
// use body parser to grab information from POST
app.use(express.static(path.join(__dirname,'/client/src/img/')));
app.use(express.static(path.join(__dirname,'client/app/views/pages/')));
app.use(express.static(path.join(__dirname,'client/src/js')));
app.use(express.static(path.join(__dirname,'client/src/css')));
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

// configure app to handle CORS requests
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Orgin','*');
    res.setHeader('Access-Control-Allow-Method','GET,POST');
    res.setHeader('Access-Control-Allow-Headers','X-Request-With,content-type,Authorization');
    next();
});

//==================================--DB--====================================


var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
// we're connected! Create your schemas and models here
});


mongoose.connect("mongodb://chanami:123456@ds139438.mlab.com:39438/smart_school");
console.log("bd connected!");


//=========================--ROUTES/API--====================================
//API ROUTES
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

 //app.use('/client',);

// app.get('/', function (req, res) {
//     res.send('GET request to the homepage')
// })

//=========================--START THE SERVER---=========================
app.listen(port);
console.log('Server listenning at localhost:'+port);




