var Students = require('../models/students');
// Wrap all the methods in an object
var Classes  = require('../models/classes');
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



    // updateStudent:function(req, res, next) {
    //     console.log("updateStudent in the sever ");
    //     res.send("updateStudent in server");
    // },

    updateGreads:function(req,res,next) {
console.log("updateGrades in the sever ");

    },






    getAll: function(req, res, next){
    Students.find(function(err, data){
      if(err) console.error;
      res.json(data);
    })
  } ,

}


// var u=update("ddd");


// Return the object
module.exports =student;

var addStudentToClass=function () {

}