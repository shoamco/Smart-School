/**
this is a first basic crud functions
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
console.log("db connected!");


    var Schema = mongoose.Schema;

    var courseSchema = new Schema({
        CourseId: String,
        CourseName: String,
        TeacherID: String,
        Grade: String,
        VerbalEvaluation: String,
        ClassId: String
    }, {collection: 'courses'});


    var classesSchema = new Schema({
        ClassId: String,
        Educator: String,
        //Img:
        Courses: [courseSchema]
    }, {collection: 'classes'})


    var studentSchema = new Schema({
        StudentId: String,
        FirstName: String,
        LastName: String,
        //Img:
        ClassId: String,
        Courses: [courseSchema]
    }, {collection: 'students'});
    var teacherSchema = new Schema({/////not finsh-list classs
        StaffId: String,
        FirstName: String,
        LastName: String,
        ListClass: [{ClassId: String, CourseId: String}],
        Type: String,
        //  Email:
    }, {collection: 'staff'});


    var Course = mongoose.model('Course', courseSchema);
    var Classes = mongoose.model('Classes', classesSchema);
    var Student = mongoose.model('Student', studentSchema);
    var Teacher = mongoose.model('Teacher', teacherSchema);


    var FindStudentByClass = function (class_id)//the functin get class id and return all student in the class  V
    {
        Student.find({ClassId: class_id}, function (err, data) {
            if (err) return console.error(err);
            console.log(data);
            hello(data);
            return data.FirstName;
        });
    }
///dont work
    var FindCourseByClass = function (class_id)//the functin get class id and return all course in the class    X
    {
        console.log(class_id)
        //console.log("class   "+Classes);
        Classes.findOne({ClassId: class_id}, function (err, data) {
            if (err) return console.error(err);
            console.log(data);

            return data;
        });
    }
//the function get name of teacher and return all his class  V
    var FindClassByTeacher = function (teacher_id)/////the functin get teacher id and return all class of this teacher
    {
        Teacher.findOne({StaffId: teacher_id}, function (err, data) {
            if (err) return console.error(err);
            console.log(data);

            return data.ListClass;
        });
    }

    var FindStudentDetails = function (studentid)///Take out accurate details  V
    {
        Student.findOne({StudentId: studentid}, function (err, data) {
            if (err) return console.error(err);
            console.log(data);
            print_studentDetails(data);
            // hello3(data);
            return data;
        });
    }

    var UpdateStudentGrade = function (studentid, courseid, grade, evaluation)///Take out accurate details  V
    {
        Student.findOne({StudentId: studentid}, function (err, data) {
            if (err) return console.error(err);
            else if (data == null)
                console.log("the student " + firstname + " " + lastname + "not  exists");
            else {
                for (var i = 0; i < data.Courses.length; i++)
                    if (data.Courses[i].CourseId == courseid) {
                        console.log("find corse id" + courseid);
                        // data.Courses[i].update({Grade: grade, VerbalEvaluation:evaluation}, function (err, data) {
                        data.Courses[i].Grade = grade;
                        data.Courses[i].VerbalEvaluation = evaluation;


                        Student.update({Courses: data.Courses}, function (err, data) {
                            if (err) return console.error(err);
                            console.log("update " + courseid);
                        });
                    }
            }

        });
    }


//not finshed    X
///we need to add courses added automatically by the student in his class
    var createStudent = function (studentid, firstname, lastname, classid, student)//the Function create student
    {
        student.findOne({StudentId: studentid}, function (err, data) {
            if (err) return console.error(err);
            else if (data != null)
                console.log("the student " + firstname + " " + lastname + " already exists");
            else {
                student.create({
                    FirstName: firstname,
                    LastName: lastname,
                    classId: classid,
                    Courses: FindCourseByClass()
                }, function (err, data) {
                    if (err) return console.error(err);
                    console.log("we create student " + firstname);
                });
            }

        });

    }
// the function createStaff- Without a list of classes !!!!!!!!!
    var CreateStaff = function (staffid, firstname, lastname, arr, type)//the Function create teacher   X
    {
        Teacher.findOne({FirstName: firstname}, function (err, data) {
            if (err) return console.error(err);
            else if (data != null)
                console.log("the teacher " + firstname + " already exists");
            else {


                Teacher.create({
                    StaffId: staffid,
                    FirstName: firstname,
                    LastName: lastname,
                    ListClass: arr,
                    Type: type
                }, function (err, data) {

                    if (err) return console.error(err);


                    console.log("we create teacher " + firstname);


                });

            }
        });
    }
//
    var deleteStudent = function (studentid)//the Function accepts a student's name and deletes it     V
    {
        Student.findOne({StudentId: studentid}, function (err, data) {
            if (err) return console.error(err);
            else if (data == null)

                console.log("the student " + studentid + " not  exists");
            //}
            else {

                Student.remove({StudentId: studentid}, function (err) {
                    if (!err) {
                        console.log("the student " + studentid + " delete from the student list");
                    }
                    else {
                        console.log("erro");
                    }
                });
            }
        });
    }


    var deleteStaff = function (staffid)//the Function accepts a student's name and deletes it  V
    {
        Teacher.findOne({StaffId: staffid}, function (err, data) {
            if (err) return console.error(err);
            else if (data == null)

                console.log("the student " + staffid + " not  exists");
            //}
            else {

                Teacher.remove({StaffId: staffid}, function (err) {
                    if (!err) {
                        console.log("the student " + staffid + " delete from the student list");
                    }
                    else {
                        console.log("erro");
                    }
                });
            }
        });
    }


    /*dont work
     var getAllClass=function(class1) {

     class1.find({},function (err, data) {
     if (!err) {
     print_class(data);
     return data;
     }
     });
     }


     */

//var ans1=FindStudentByClass(1);//good
//var ans2=FindClassByTeacher(1);//good
//var ans3= FindStudentDetails(100);//good
//deleteStudent(200);//GOOD
//deleteStaff(3);//good
//var ans6=UpdateStudentGrade(100,1,50,"ssssssss");//good


//createStudent(200,"sara","levi",1,Student); dont work
//var ans5=FindCourseByClass(1);//NOT WORK
//CreateStaff(3,"a","b",[[1,1],[2,2]],1);//dont worx X
//createStaff("k","b",1,Teacher);//Without a list of classes !!!!!!!!!
//var ans4=getAllClass(Class);


    var print_studentDetails = function (data) {
        console.log("StudentDetails " + data.FirstName + " " + data.LastName + data.LastName);
        for (var i = 0; i < data.Courses.length; i++) {
            console.log("course name " + data.Courses[i].CourseName + " grade " + data.Courses[i].Grade);
        }
    }

    var print_class = function (data) {
        var i;
        for (i = 0; i < data.length; i++) {
            console.log("class " + data[i].classId + " " + data[i].educator);
        }
    }
    var hello = function (data) {
        var i;
        for (i = 0; i < data.length; i++) {
            console.log("hello " + data[i].FirstName + " " + data[i].LastName);
        }
    }
    var hello2 = function (data) {
        var i;
        for (i = 0; i < data.length; i++) {
            console.log("hello " + data[i].class_name);
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
            if (err) {
                console.log("Error: " + err);
            }
            console.log("User created!");
            res.send("User created! Go to /find!!");
        });
    });
    app.get('/find', function (req, res) {
        User.find({name: "Adi"}, function (err, result) {
            if (err) {
                console.log("Error: " + err);
            }
            console.log("User find!");
            res.send("User: " + result);
        });
    });
    app.listen(8080);


    /*
     var createCorse=function(coursename,t,g,student)//the Function create student
     {
     student.findOne({FirstName: firstname},function (err, data) {
     if (err) return console.error(err);
     else if (data!=null)
     console.log("the student "+firstname+ " already exists");
     else
     { student.create({FirstName: firstname,LastName:lastname,classId: classid}, function (err, data) {
     if (err) return console.error(err);
     console.log("we create student "+firstname);
     });
     }

     });

     }
     */
