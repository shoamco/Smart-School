
var Classes  = require('../models/classes');
var Users  = require('../models/users');
var Students  = require('../models/students');
// Wrap all the methods in an object

var classes = {
  update: function(req, res, next){
    console.log("im in the server");
    Classes.findOne({ClassId: req.body.ClassIdOriginal},function (err, data1) {
        if (err) return console.error(err);
        if (data1.Educator!= req.body.Educator)
        {
            Classes.findOneAndUpdate({ClassId: req.body.ClassIdOriginal}, {Educator:req.body.Educator}, function (err, data2) {
                if (err) return console.error(err);
                console.log("update course ");
                console.log(data1.EducatorId);
            });
            Users.findOneAndUpdate({UserId: data1.EducatorId}, {UserName:req.body.Educator}, function (err, data2) {//check!!!
                if (err) return console.error(err);
                console.log("update Staff ");
            });
        }
    });
  },

    updateCourse: function (req,res,next){
        console.log("lm in the server ");
        Classes.findOne({ClassId: req.body.ClassIdOriginal},function (err, data1) {
            if (err) return console.error(err);
           var courses=data1.Courses;
           console.log(req.body.CourseId);
           for(var i=0;i<courses.length;i++)
           {
               if(courses[i].CourseId==req.body.CourseId)
               {
                   courses[i].TeacherName=req.body.TeacherName;
               }
           }
            Classes.findOneAndUpdate({ClassId: req.body.ClassIdOriginal}, {Courses:courses}, function (err, data2) {
                    if (err) return console.error(err);
                    console.log("update course ");
                });
        });
          Students.find({ClassId: req.body.ClassIdOriginal},function (err, data3){
              if (err) return console.error(err);
              var studentInClass=data3;
              for(var i=0;i<studentInClass.length;i++){
                  var courses=studentInClass[i].Courses;
                  for(var j=0;j<courses.length;j++)
                  {
                      console.log(req.body.CourseId);
                    if(courses[j].CourseId==req.body.CourseId)
                    {
                          courses[j].TeacherName=req.body.TeacherName;
                    }
                  }
                  Students.findOneAndUpdate({StudentId:studentInClass[i].StudentId }, {Courses:courses}, function (err, data2) {
                      if (err) return console.error(err);
                      console.log("update course ");
                  });
              }
          });


    },
    CreateCourse: function(req, res, next) {
        Classes.findOne({ClassId: req.body.ClassId},function (err, data1) {
            if (err) return console.error(err);
           var courses = data1.Courses;
           var flag=0;
            console.log(req.body.CourseId);
            for (var i = 0; i < courses.length; i++){

                    if (courses[i].CourseId == req.body.CourseId) {
                        console.log("שגיאה:הקורס עם הקוד: " + req.body.CourseId + " כבר קיים במערכת ");
                        flag=1;
                    }
            }
             if(flag==1)///if the id course is exist
                 {res.send("שגיאה:הקורס עם הקוד: " + req.body.CourseId + " כבר קיים במערכת ");}
             else {


                    Classes.findOne({ClassId: req.body.ClassId}, function (err, data) {
                        if (err) return console.error(err);
                        // for (var i = 0; i < data.Courses.length; i++) {
                        //     courses[i] = data.Courses[i]
                        // }

                        courses.push({
                            "Evaluation": "",
                            "Grade": "",
                            "TeacherName":  req.body.TeacherName,
                            "CoursName": req.body.CourseName,
                            "CourseId": req.body.CodeCourse
                        });
                        Classes.findOneAndUpdate({ClassId: req.body.ClassId},{Courses:courses}, function (err, data) {///add student  from the class
                            if (err) return console.error(err);
                            console.log("add a course to list course in class");
                        });

                   });
               }
                });



    },
  delete: function(req, res, next){
    res.json({type: "Delete", id: req.params.id});
  },
  getAll: function(req, res, next){
    Classes.find(function(err, data){
      if(err) console.error;
      res.json(data);
    })
  } 
};


// Return the object
module.exports = classes;
