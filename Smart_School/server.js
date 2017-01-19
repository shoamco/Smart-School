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
console.log("bd connected!");

//=========================--ROUTES/API--====================================
//API ROUTES

var student = require('./server/controllers/student');
var classes = require('./server/controllers/classes');
var staff = require('./server/controllers/staff');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
//console.log("after get");


// Get all products
router.get('/students', student.getAll);
router.get('/classes', classes.getAll);
router.get('/staff', staff.getAll);

router.post('/classes/:classId/grades', student.updateGrades);
//router.get('/students/getById', student.FindStudentByClass);

// Create a product
//router.post('/student', student.create);

// Get one product, update one product, delete one product
/*router.route('/api/product/:id')
    .get(product.read)
    .put(product.update)
    .delete(product.delete);*/

// Register the routing
app.use('/', router);










module.exports = router;
 //app.use('/client',);

// app.get('/', function (req, res) {
//     res.send('GET request to the homepage')
// })

//=========================--START THE SERVER---=========================
app.listen(port);
console.log('Server listenning at localhost:'+port);



