var Students = require('../models/students');
// Wrap all the methods in an object
var Classes  = require('../models/classes');

var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');
//
var fs = require('fs');
var path = require('path');
var http = require('http');
// var express = require('express');
// var router = express.Router();
var student = {
  read: function(req, res, next){
    res.json({type: "Read", id: req.params.id});
  },
  create: function(req, res, next){
    //  console.log("in server controller create");
      Students.findOne({StudentId: req.body.StudentId},function (err, data) {
          if (err) return console.error(err);
          else if (data != null){
              console.log("the student id" + req.body.StudentId + " already exists");
          res.send( "שגיאה:סטודנט עם ת.ז. "+req.body.StudentId+" כבר קיים במערכת ");
              }
          else {
              var courses = [];
              if(req.body.ClassId==null)
                  res.send( "בחר כיתה ");
             else {
                  Classes.findOne({ClassId: req.body.ClassId}, function (err, data) {
                      if (err) return console.error(err);
                      for (var i = 0; i < data.Courses.length; i++) {
                          courses[i] = data.Courses[i]
                      }
                      var arr_student=data.Students;
                      arr_student.push({
                          "StudentId": req.body.StudentId,
                          "FirstName": req.body.FirstName,
                          "LastName": req.body.LastName
                      });
                      Classes.findOneAndUpdate({ClassId: req.body.ClassId},{Students:arr_student}, function (err, data) {///add student  from the class
                          if (err) return console.error(err);
                          console.log("add student to list student in class");
                      });

                      Students.create({
                          StudentId: req.body.StudentId,
                          FirstName: req.body.FirstName,
                          LastName: req.body.LastName,
                          ClassId: req.body.ClassId,
                          Courses: courses
                      }, function (err, data) {
                          if (err) return console.error(err);
                          console.log("we create student ");

                          res.send("הסטודנט נכנס למערכת");
                      });





                  });
              }
          }
      });

  },
  update: function(req, res, next){
      Students.findOne({StudentId: req.body.StudentIdOriginal},function (err, data1) {
          if (err) return console.error(err);
          if(data1.ClassId!=req.body.ClassId)//Switching Class-add student to the new class and delete him from the old class
                                                  ///and swith the course in the student
          {
              Classes.findOne({ClassId: req.body.ClassId}, function (err, data) {
                  if (err) return console.error(err);
                  var courses=[];
                  for (var i = 0; i < data.Courses.length; i++) {///the new course
                      courses[i] = data.Courses[i]
                  }
                  Students.findOneAndUpdate({StudentId: req.body.StudentIdOriginal}, {Courses:courses}, function (err, data) {
                      if (err) return console.error(err);
                      console.log("update course ");
                  })
                  var arr_student=data.Students;
                  arr_student.push({
                      "StudentId": req.body.StudentId,
                      "FirstName": req.body.FirstName,
                      "LastName": req.body.LastName
                  });
                  Classes.findOneAndUpdate({ClassId: req.body.ClassId},{Students:arr_student}, function (err, data) {///add student  from the class
                      if (err) return console.error(err);
                      console.log("add student to list student in class"+ req.body.ClassId);
                  });
              });


              Classes.findOne({ClassId: data1.ClassId}, function (err, data2) {
                  if (err) return console.error(err);

                  var arr_student=data2.Students;
                  var index;
                  for(var i=0;i<arr_student.length;i++)
                      if(arr_student[i].StudentId==data1.StudentId)
                          index=i;
                  //  console.log("index"+index);

                  arr_student.splice(index,1);
                  //    console.log(" arr_student"+ arr_student);
                  Classes.findOneAndUpdate({ClassId: data1.ClassId},{Students:arr_student}, function (err, data) {///delete student from list student in class
                      if (err) return console.error(err);
                      console.log("delete student from list student in class"+data1.ClassId);
                  });
              });
              }
              else {
              Classes.findOne({ClassId: data1.ClassId}, function (err, data2) {
                  if (err) return console.error(err);

                  var arr_student=data2.Students;
                  //var index;
                  for(var i=0;i<arr_student.length;i++)
                      if(arr_student[i].StudentId==data1.StudentId) {

                          arr_student[i].StudentId=req.body.StudentId;
                          arr_student[i].FirstName=req.body.FirstName;
                              arr_student[i].LastName= req.body.LastName;
                      }
                  //  console.log("index"+index);

                 // arr_student.splice(index,1);
                  //    console.log(" arr_student"+ arr_student);
                  Classes.findOneAndUpdate({ClassId: data1.ClassId},{Students:arr_student}, function (err, data) {///delete student from list student in class
                      if (err) return console.error(err);
                      console.log("delete student from list student in class"+data1.ClassId);
                  });
              });

          }
          Students.findOneAndUpdate({StudentId: req.body.StudentIdOriginal}, {
              StudentId: req.body.StudentId,
              FirstName: req.body.FirstName,
              LastName: req.body.LastName,
              ClassId: req.body.ClassId,
              // Courses:courses
          }, function (err, data) {
              if (err) return console.error(err);
              console.log("update student ");

              res.send("הסטודנט עודכן");
          });
      });
  },
  delete: function(req, res, next){
      console.log("in server  delete"+req.params.id);
      Students.findOne({StudentId: req.params.id}, function (err, data) {
          if (err) return console.error(err);
          else if(data==null)

              console.log("the student " + req.params.id + " not  exists");
          //}
          else{
              Classes.findOne({ClassId: data.ClassId}, function (err, data1) {
                  if (err) return console.error(err);

                  var arr_student=data1.Students;
                  var index;
                for(var i=0;i<arr_student.length;i++)
                    if(arr_student[i].StudentId==data.StudentId)
                        index=i;
                //  console.log("index"+index);

            arr_student.splice(index,1);
              //    console.log(" arr_student"+ arr_student);
              Classes.findOneAndUpdate({ClassId: data.ClassId},{Students:arr_student}, function (err, data) {///delete student from list student in class
                  if (err) return console.error(err);
                  console.log("delete student from list student in class");
              });
          });
              Students.remove({StudentId: data.StudentId}, function(err) {
                  if (!err) {
                      console.log("the student "+req.params.id+ " delete from the student list");
                      res.send("הסטודנט נמחק");
                  }
                  else {
                      console.log("erro");
                  }
              });

          }
      });

  },




updateGreads:function(req,res,next) {
    console.log("in the server updateGreads");
   // console.log(req.body.StudentGreads);
   //console.log(req.body.StudentGreads[0].StudentId);
 //  console.log(req.body.StudentGreads[s].Grade);
    req.body.StudentGreads.forEach(function (eachName, index){

     Students.findOne({StudentId: req.body.StudentGreads[index].StudentId}, function (err, data) {//Finding the right student
        // console.log("index" + index);
         if (err) return console.error(err);
         else if (data == null)
             console.log("the student not  exists");
         else {
             for (var i = 0; i < data.Courses.length; i++) {////Finding the right course
                 if (data.Courses[i].CourseId == req.body.CourseId) {
                  //   console.log("find corse id " + req.body.CourseId);
                  //   console.log("the last grade" + data.Courses[i].Grade);
                   //  console.log("index" + index);
                   //  console.log("the class grade" + req.body.StudentGreads[index].Grade);

                     data.Courses[i].Grade = req.body.StudentGreads[index].Grade;
                     data.Courses[i].Evaluation = req.body.StudentGreads[index].Evaluation;

                 }
             }
             Students.findOneAndUpdate({StudentId: req.body.StudentGreads[index].StudentId}, {Courses: data.Courses}, function (err, data2) {//update course in the student
                 if (err) return console.error(err);
                 console.log("update student" + req.body.StudentGreads[index].StudentId);

             });





         }

     });
    });

   res.send("all student update")
    },

///////////////////////////



    confirmCourse:function(req,res,next) {
        console.log("in the server confirmCourses:");

        req.body.StudentGreads.forEach(function (eachName, index){

            Students.findOne({StudentId: req.body.StudentGreads[index].StudentId}, function (err, data) {//Finding the right student
                //console.log("index" + index);
                if (err) return console.error(err);
                else if (data == null)
                    console.log("the student not  exists");
                else {
                    for (var i = 0; i < data.Courses.length; i++) {////Finding the right course
                        if (data.Courses[i].CourseId == req.body.CourseId) {


                            data.Courses[i].Grade = req.body.StudentGreads[index].Grade;
                            data.Courses[i].Evaluation = req.body.StudentGreads[index].Evaluation;

                        }
                    }
                    Students.findOneAndUpdate({StudentId: req.body.StudentGreads[index].StudentId}, {Courses: data.Courses}, function (err, data2) {//update course in the student
                        if (err) return console.error(err);
                        console.log("update student" + req.body.StudentGreads[index].StudentId);

                    });

                }
            });
        });
        Classes.findOne({ClassId: req.body.ClassId}, function (err, data3) {
            if (err) return console.error(err);

            var arr_course=data3.Courses;
            for(var i=0;i<arr_course.length;i++)
                if(arr_course[i].CourseId==req.body.CourseId)
                {
                    console.log("before ConfirmEducator "+ arr_course[i].ConfirmEducator);
                    arr_course[i].ConfirmEducator=1;
                }
            Classes.findOneAndUpdate({ClassId: req.body.ClassId},{Courses: arr_course}, function (err, data) {///
                if (err) return console.error(err);
                console.log("ConfirmEducator=1");
            });
        });
        res.send("all student update and Confirm ")

    },

    cancelConfirmCourse:function(req,res,next) {
        console.log("in the server cancelConfirmCourse");

        Classes.findOne({ClassId: req.body.ClassId}, function (err, data3) {///Finding the right class
            if (err) return console.error(err);

            var arr_course=data3.Courses;
            for(var i=0;i<arr_course.length;i++)
                if(arr_course[i].CourseId==req.body.CourseId)///Finding the right course
                {
                    console.log("before ConfirmEducator "+ arr_course[i].ConfirmEducator);
                    arr_course[i].ConfirmEducator=0;
                }
            Classes.findOneAndUpdate({ClassId: req.body.ClassId},{Courses: arr_course}, function (err, data) {///cancel the ConfirmEducator
                if (err) return console.error(err);
                console.log("ConfirmEducator=0");
            });
        });
        res.send("cancel the ConfirmEducator ")


    },






    getAll: function(req, res, next){
    // Students.find(function(err, data){
        //   if(err) console.error;
        //   res.json(data);
        // })
        Students.find().sort({ 'FirstName' : 1}).exec(function(err, data){
            if(err) console.error;
            res.json(data);
        })
  } ,

    //////////////////
    certificate: function(req, res, next) {
        console.log("in server function Certificate");

        Students. find(function(err, data) {

            var allStudentGrades = [];
            data.forEach(function (dataStudent, index){

            var myCourses=[];

                for (var j = 0; j < dataStudent.Courses.length; j++) {

                    myCourses[j]={"CoursName":dataStudent.Courses[j].CoursName,"Grade":dataStudent.Courses[j].Grade,
                        "Evaluation": dataStudent.Courses[j].Evaluation};



                }


if(dataStudent.ClassId<=3)//Until third grade without grade
            var content = fs.readFileSync(path.resolve('certificate/input1.docx'), 'binary');
else
    var content = fs.readFileSync(path.resolve('certificate/input2.docx'), 'binary');
            var zip = new JSZip(content);

            var doc = new Docxtemplater();
            doc.loadZip(zip);


                doc.setData({
                    FirstName: dataStudent.FirstName,
             LastName: dataStudent.LastName,
                    "myCourses":myCourses
                });
               // console.log("Student index"+index);
            try {
                // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                doc.render()
            }
            catch (error) {
                var e = {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    properties: error.properties,
                }
                console.log(JSON.stringify({error: e}));
                // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
                throw error;
            }

            var buf = doc.getZip()
                .generate({type: 'nodebuffer'});

// buf is a nodejs buffer, you can either write it to a file or do anything else with it.
            fs.writeFileSync(path.resolve('certificate/' +dataStudent.FirstName+"_"+dataStudent.LastName+ '.docx'), buf);
        });
            console.log("certificate for all student");



            // var file = fs.readFileSync('certificate/input2.docx', 'binary');
            //
            // res.setHeader('Content-Length', file.length);
            // res.write(file, 'binary');
         //   res.end();
         //    var filePath = "certificate/input1.docx"; // Or format the path using the `id` rest param
         //    var fileName = "input1.docx"; // The default name the browser will use
         //
         //    res.download(filePath, fileName);
res.send("התעודות נוצרו")
        })

    },
  download : function(url, dest, cb) {

    },
}


// var u=update("ddd");


// Return the object
module.exports =student;

var addStudentToClass=function () {

}