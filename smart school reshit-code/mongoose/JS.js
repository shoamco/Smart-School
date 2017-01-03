/**
this is a 
 */
var express = require("express");
var mongoose = require("mongoose");
var app = express();

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
// we're connected! Create your schemas and models here
});


mongoose.connect("mongodb://chanami:123456@ds139438.mlab.com:39438/smart_school");
console.log("bd connected!");

var Schema = mongoose.Schema;
var studentSchema = new Schema({
    FirstName: String,
    LastName: String,
    classId: String
}, {collection: 'students'});
var teacherSchema = new Schema({
    FirstName: String,
    LastName: String,
    ListClass: [{class_name:String}],
    Type:String
}, {collection: 'staff'});

var Student = mongoose.model('Student', studentSchema);
var Teacher = mongoose.model('Teacher', teacherSchema);
var findStudent=function(class_id,student)
{
    student.find({classId: class_id}, function (err, data) {
        if (err) return console.error(err);
        console.log(data);
        hello(data);
        return data.FirstName;
    });
}


var findClass=function(teacher_name,teacher)///change to ID
{
    teacher.findOne({ FirstName:teacher_name}, function (err, data) {
        if (err) return console.error(err);
        console.log(data.ListClass);
        hello2(data.ListClass);
        return data.ListClass;
    });
}

var findStudentDetails=function(studentName,student)///Take out accurate details
{ student.findOne({FirstName: studentName}, function (err, data) {
    if (err) return console.error(err);
    console.log("StudentDetails "+data.LastName);
   // hello3(data);
    return data;
});
}

var ans1=findStudent(1,Student);
var ans2=findClass("avi",Teacher);
var ans3=findStudentDetails("ben",Student);
var hello =function(data)
{
    var i;
    for(i=0;i<data.length;i++)
    {
        console.log("hello " +data[i].FirstName + " " +data[i].LastName);
    }
}
var hello2 =function(data)
{
    var i;
    for(i=0;i<data.length;i++)
    {
        console.log("hello " +data[i].class_name);
    }
}

//console.log(Student.data);
var userSchema = {
    name: String,
    age: Number,
    city: String
}

var User = mongoose.model('User', userSchema, 'users');

var newUser = User({
    name: "Adi",
    age: 20,
    city: "New York"
});

app.get('/', function (req, res) {
    res.send("Go to /saveUser!!");
});
app.get('/saveUser', function (req, res) {
    newUser.save(function (err) {
        if(err) {console.log("Error: "+ err);}
        console.log("User created!");
        res.send("User created! Go to /find!!");
    });
});
app.get('/find', function (req, res) {
    User.find({name: "Adi"}, function (err, result) {
        if(err) {console.log("Error: "+ err);}
        console.log("User find!");
        res.send("User: "+result);
    });
});
app.listen(8080);
