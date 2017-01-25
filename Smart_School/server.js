var http = require('http'),
    fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    url = require('url'),
    mongoose = require("mongoose");
var app = express();
var port = 5000;
var router  = express.Router();

// APP CONFIGURATION------------------------------------------
// use body parser to grab information from POST
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'client/app/controllers')));
app.use(express.static(path.join(__dirname,'client/app/services')));
app.use(express.static(path.join(__dirname,'client/app/directives')));
app.use(express.static(path.join(__dirname, '/client')));
app.use(express.static(path.join(__dirname, '/server/controllers')));
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
console.log("db connected!");

//=========================--ROUTES/API--====================================
//API ROUTES

var student = require('./server/controllers/student');
var classes = require('./server/controllers/classes');
var user = require('./server/controllers/user');


router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
//console.log("after get");


// Get all products
router.get('/students', student.getAll);
router.get('/classes', classes.getAll);
router.get('/users', user.getAll);


router.post('/createStudent', student.create);
//
// app.post('/createStudent', function (req, res) {
//     console.log("in server function createStudent");
//
//   student.create(req);
//    res.send("hello");
// })
router.get('/deleteStudent/:id',student.delete);


router.post('/updateStudent', student.update);
router.post('/updateGreads', student.updateGreads);
router.post('/confirmCourse', student.confirmCourse);
//router.post('/login', staff.getUser);


// app.post('/updateStudent', function (req, res) {
//     console.log("in server function createStudent");
//
//     student.updateStudent(req);
//    res.send("hello");
// })

// router.post('/classes/:classId/grades', student.updateGrades);
// router.post('updateStudent', student.updateStudent);
// router.post('/func',student.create);

//router.get('/students/getById', student.FindStudentByClass);

// Create a product
//router.post('/student', student.create);

// Get one product, update one product, delete one product
/*router.route('/api/product/:id')
    .get(product.read)
    .put(product.update)
    .delete(product.delete);*/

// Register the routing

// router.post('/deleteStudent/:id', student.delete);
//var db1=require('./db.js');

//
// app.post('/updateCompany', function (req, res,next) {
//     console.log("serving updateCompany");
//     var document=req.body;
//     // console.log(document);
//
//     var value_key={
//         "_id":new mongodb.ObjectID(document.id),
//     }
//     //console.log(value_key);
//     var arr=student.updateCompany(value_key,document);
//     //console.log("arr"+arr);
//     var arrComp;
//     arr.toArray(function(err, items) { //foreach
//         arrComp=JSON.stringify(items);
//         console.log(items);
//         res.send(arrComp);
//
//     });
//
// });





app.use('/', router);










module.exports = router;
 //app.use('/client',);

// app.get('/', function (req, res) {
//     res.send('GET request to the homepage')
// })

//=========================--START THE SERVER---=========================
app.listen(port);
console.log('Server listenning at localhost:'+port);



