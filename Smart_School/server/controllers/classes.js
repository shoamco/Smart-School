
var Classes  = require('../models/classes');
var Users  = require('../models/users');
var Students  = require('../models/students');
// Wrap all the methods in an object

var classes = {
  update: function(req, res, next){
    console.log("im in the server");
    Classes.findOne({ClassId: req.body.ClassIdOriginal},function (err, data1) {
        if (err) return console.error(err);
        if (data1.EducatorId!= req.body.EducatorId)
        {
            Users.findOne({UserId: req.body.EducatorId},function (err, data4) {
                if (err) return console.error(err);
                if (data4 == null) {
                    res.send("המשתמש לא קיים");
                }
                else {
                    Classes.findOneAndUpdate({ClassId: req.body.ClassIdOriginal}, {EducatorId: req.body.EducatorId}, function (err, data2) {
                        if (err) return console.error(err);

                    });
                    Users.findOneAndUpdate({UserId: req.body.EducatorId}, {Type: 2}, function (err, data2) {
                        if (err) return console.error(err);
                        res.send("הכיתה עודכנה");

                    });
                }

            });
        }
        if (data1.CoordinatorId!= req.body.CoordinatorId)
        {
            Users.findOne({UserId: req.body.CoordinatorId},function (err, data4) {
                if (err) return console.error(err);
                if (data4 == null) {
                    res.send("המשתמש לא קיים");
                }
                else {
                    Classes.findOneAndUpdate({ClassId: req.body.ClassIdOriginal}, {CoordinatorId: req.body.CoordinatorId}, function (err, data2) {
                        if (err) return console.error(err);

                    });
                    Users.findOneAndUpdate({UserId: req.body.CoordinatorId}, {Type: 2}, function (err, data2) {
                        if (err) return console.error(err);
                        res.send("הכיתה עודכנה");
                    });
                }

            });
        }
    });
  },

  getAll: function(req, res, next){

      Classes.find().sort({ 'ClassId' : 1}).exec(function(err, data){
          if(err) console.error;
            res.json(data);
      })
  },



    updateCourse: function (req,res,next){
        console.log("lm in the server ");
        Classes.findOne({ClassId: req.body.ClassIdOriginal},function (err, data1) {
            if (err) return console.error(err);
            var courses = data1.Courses;
            console.log(req.body.CourseId);
            Users.findOne({UserId: req.body.TeacherId}, function (err, data4) {
                if (err) return console.error(err);
                if (data4 == null) {
                    res.send("המשתמש לא קיים");
                }
                else {
                    for (var i = 0; i < courses.length; i++) {
                        if (courses[i].CourseId == req.body.CourseId) {

                            courses[i].TeacherId = req.body.TeacherId;
                        }
                    }
                    Classes.findOneAndUpdate({ClassId: req.body.ClassIdOriginal}, {Courses: courses}, function (err, data2) {
                        if (err) return console.error(err);
                        res.send("הקורס עודכן");
                    });

                    Students.find({ClassId: req.body.ClassIdOriginal}, function (err, data3) {
                        if (err) return console.error(err);
                        var studentInClass = data3;
                        for (var i = 0; i < studentInClass.length; i++) {
                            var courses = studentInClass[i].Courses;
                            for (var j = 0; j < courses.length; j++) {
                                console.log(req.body.CourseId);
                                if (courses[j].CourseId == req.body.CourseId) {
                                    courses[j].TeacherId = req.body.TeacherId;
                                }
                            }
                            Students.findOneAndUpdate({StudentId: studentInClass[i].StudentId}, {Courses: courses}, function (err, data2) {
                                if (err) return console.error(err);
                                console.log("update course ");
                            });
                        }
                    });
                }
            });
        });

    },
    CreateCourse: function(req, res, next) {
        console.log("in the  CreateCourse");
        Classes.findOne({ClassId: req.body.ClassId},function (err, data1) {
            if (err) return console.error(err);
           var courses = data1.Courses;
           var flag=0;
                Users.findOne({UserId: req.body.TeacherId}, function (err, data4) {
                    if (err) return console.error(err);
                if (data4 == null) {
                        console.log("the user is not exist");
                        res.send("המשתמש לא קיים");
                    }
                else {
                    for (var i = 0; i < courses.length; i++){
                            if (courses[i].CourseId == req.body.CodeCourse) {
                                flag=1;
                            }
                    }
                     if(flag==1)///if the id course is exist
                         {console.log("the course is already exist");
                             res.send("שגיאה:הקורס עם הקוד: " + req.body.CodeCourse + " כבר קיים במערכת ");
                         }
                     else {
                         console.log("the course is not exist");
                         Classes.findOne({ClassId: req.body.ClassId}, function (err, data) {
                             if (err) return console.error(err);


                             courses.push({
                                 "Evaluation": "",
                                 "Grade": "",
                                 "TeacherId": req.body.TeacherId,
                                 "CoursName": req.body.CourseName,
                                 "CourseId": req.body.CodeCourse,
                                 "ConfirmEducator": "0",
                                 "ConfirmCoordinator": "0",
                                 "ConfirmPrincipal": "0",
                                 "ConfirmTeacher": "0",
                             });
                             Classes.findOneAndUpdate({ClassId: req.body.ClassId}, {Courses: courses}, function (err, data) {///add student  from the class
                                 if (err) return console.error(err);
                                 console.log("add a course to list course in class");
                             });

                         });


                         console.log("waanna update on std");

                         Students.find({ClassId: req.body.ClassId}, function (err, data3) {
                             console.log("i am in std");
                             if (err) return console.error(err);
                             var studentInClass = data3;
                             console.log(data3);
                             for (var i = 0; i < studentInClass.length; i++) {
                                 var courses = studentInClass[i].Courses;
                                 //find all course of class id
                                 courses.push({
                                     "Evaluation": "",
                                     "Grade": "",
                                     "TeacherId": req.body.TeacherId,
                                     "CoursName": req.body.CourseName,
                                     "CourseId": req.body.CodeCourse,
                                     "ConfirmEducator": "0",
                                     "ConfirmCoordinator": "0",
                                     "ConfirmPrincipal": "0",
                                     "ConfirmTeacher": "0",
                                 });


                                 Students.findOneAndUpdate({StudentId: studentInClass[i].StudentId}, {Courses: courses}, function (err, data2) {
                                     if (err) return console.error(err);
                                     console.log("update course on students");
                                 });
                             }

                         });
                     }
                }
    });
        });



    },
    deleteCourse: function(req, res, next){
        console.log("in server  delete course");
        Classes.findOne({ClassId: req.body.ClassId},function (err, data1) {
            if (err)
                return console.error(err);
            else{
                var courses=data1.Courses;
                var index;
                for(var i=0;i<courses.length;i++)
                    if(courses[i].CourseId==req.body.CourseId)
                            index=i;
                    //  console.log("index"+index);

                courses.splice(index,1);
                    //    console.log(" arr_student"+ arr_student);
                    Classes.findOneAndUpdate({ClassId: data1.ClassId},{Courses:courses}, function (err, data) {///delete student from list student in class
                        if (err) return console.error(err);
                        console.log("delete course from list courses in class");
                    });


            }
        });
        Students.find({ClassId: req.body.ClassId},function (err, data3){
            console.log("i am in std deleting the course");
            if (err) return console.error(err);
            var studentInClass=data3;
            var coursesStd
            for(var i=0;i<studentInClass.length;i++){//update all student in class
                 coursesStd=studentInClass[i].Courses;
            var ind;
            for(var j=0;j<coursesStd.length;j++)
                if (coursesStd[j].CourseId == req.body.CourseId)
                    ind = j;
                coursesStd.splice(ind, 1);
                Students.findOneAndUpdate({StudentId: studentInClass[i].StudentId}, {Courses: coursesStd}, function (err, data2) {
                    if (err) return console.error(err);
                    console.log("delete the course on students");
                });
            }
        });
    },

    var: switchClasses_help = exports.switchClasses_help = function(i){
        Classes.findOne({ClassId:i}, function (err, data) {

            if (err)
                return console.error(err);
            else {
                var newStudents = data.Students;

                Classes.findOneAndUpdate({ClassId: (i + 1)}, {Students: newStudents}, function (err, data1) {
                    if (err)
                        return console.error(err);
                    else {
                        var idClass;
                        if (i != 8)
                            idClass = i+1;
                        else
                            idClass = "graduate"
                        if(i==1)
                            console.log('i=1');

                        newStudents.forEach(function (student) {
                            Students.findOneAndUpdate({StudentId: student.StudentId}, {
                                ClassId: idClass,
                                Courses: data1.Courses
                            }, function (err, data2) {
                                if (err)
                                    return console.error(err);

                                else if(i==1)
                                    console.log(data2);

                            });
                        })

                    }


                });
            }
        });

    },
    switchClasses: function (req, res, next) {
        console.log("in the server classes- switchClasses ");
        switchClasses_help8();
        for (var i = 7; i > 0; i--) {
            switchClasses_help(i);

        }
        switchClasses_help1();
        res.send("classes updated");
    },
    var: switchClasses_help8 = exports.switchClasses_help8=function(){
        Classes.findOne({ClassId:8}, function (err, data) {

            if (err)
                return console.error(err);
            else {
                var newStudents = data.Students;


                newStudents.forEach(function (student) {
                    Students.findOneAndUpdate({StudentId: student.StudentId}, {
                        ClassId: "graduate",
                        Courses: []
                    }, function (err, data2) {
                        if (err)
                            return console.error(err);
                        else
                            console.log(data2);

                    });
                });
            }
        });
    },
    var: switchClasses_help1 = exports.switchClasses_help8=function() {
         Classes.findOneAndUpdate({ClassId: 1}, {Students: []}, function (err, data) {

             if (err)
                 return console.error(err);

         });
    },
};


// Return the object
module.exports = classes;
