var http = require('http'),
    fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    url = require('url'),
 Docxtemplater=require('docxtemplater'),
    mongoose = require("mongoose");


/////////////
var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');

 var fs = require('fs');
 var path = require('path');
//var download = require('download-file');







var app = express();
var port = 5000;
var router  = express.Router();

// APP CONFIGURATION------------------------------------------
// use body parser to grab information from POST
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'certificate')));
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

//mongoose.Promise = global.Promise;

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
// router.get('/deleteCourse/:courseid',classes.deleteCourse);


router.post('/updateStudent', student.update);
router.post('/updateGreads', student.updateGreads);
router.post('/confirmCourse', student.confirmCourse);
router.post('/cancelConfirmCourse',student.cancelConfirmCourse);
router.post('/login', user.getUser);
router.post('/changePassword', user.updatePassword);


router.post('/deleteCourse', classes.deleteCourse);


router.post('/updateClass', classes.update);
router.post('/updateCourse', classes.updateCourse);
router.post('/AddCourse', classes.CreateCourse);
router.post('/updateGreads', student.updateGreads);

router.post('/confirmCourse', student.confirmCourse);
router.post('/cancelConfirmCourse',student.cancelConfirmCourse);
router.post('/switchClasses',classes.switchClasses);



//router.post('/login', staff.getUser);
//router.post('/confirmCourse', student.confirmCourse);
//router.post('/cancelConfirmCourse',student.cancelConfirmCourse);
router.post('/login', user.getUser);
router.post('/admin/Certificate',  student.certificate);


router.get('/admin/download',student.download);

// router.get('/download', function (req, res, next) {
//     console.log("in server-download");
//   for(var i=1;i<=2;i++) {
//
//          console.log("i" + i);
//          var filePath = "certificate/input" + i + ".docx"; // Or format the path using the `id` rest param
//          var fileName = "ans" + i + ".docx"; // The default name the browser will use
//
//        //  res.download(filePath, fileName);
//       res.download(filePath, fileName, function(err){
//           if (err) {
//               // Handle error, but keep in mind the response may be partially-sent
//               // so check res.headersSent
//           } else {
//               console.log("ans" + i);
//           }
//       });
//
//   }
// });
// router.get('/download2', function (req, res, next) {
//     var url = 'certificate/input1.docx';
//
//     var options = {
//         directory: 'certificate',
//       //  filename: "/anss1.docx",
//
//     }
//
//     res.download(url, options, function (err) {
//         if (err) throw err
//         console.log("meow")
//     })
// });
////////////////////////////////////////////
// app.post('/updateCompany', function (req, res,next) {
// app.post('/certificate', function (req, res) {
//     console.log("in server function Certificate");
//   //  var allStudent=student.getAll();
//
// //
// //     var content = fs.readFileSync(path.resolve(__dirname, 'input.docx'), 'binary');
// //
// //     var zip = new JSZip(content);
// //
// //     var doc = new Docxtemplater();
// //     doc.loadZip(zip);
// //
// // //set the templateVariables
// //     doc.setData({
// //         first_name: 'חיים',
// //         last_name: 'כהן',
// //         phone: '0652455478',
// //         description: 'New Website'
// //     });
// //
// //     try {
// //         // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
// //         doc.render()
// //     }
// //     catch (error) {
// //         var e = {
// //             message: error.message,
// //             name: error.name,
// //             stack: error.stack,
// //             properties: error.properties,
// //         }
// //         console.log(JSON.stringify({error: e}));
// //         // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
// //         throw error;
// //     }
// //
// //     var buf = doc.getZip()
// //         .generate({type: 'nodebuffer'});
// //
// // // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
// //     fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);
// })
//





app.use('/', router);










module.exports = router;
 //app.use('/client',);

// app.get('/', function (req, res) {
//     res.send('GET request to the homepage')
// })

//=========================--START THE SERVER---=========================
app.listen(port);
console.log('Server listenning at localhost:'+port);



