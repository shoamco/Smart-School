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
          else if (data != null)
              console.log("the student id" + req.body.StudentId + " already exists");
          else {
              var courses = [];
              Classes.findOne({ClassId:req.body.ClassId}, function (err, data) {
                  if (err) return console.error(err);
                  for (var i = 0; i < data.Courses.length; i++) {
                      courses[i] = data.Courses[i]
                  }

              Students.create({
                  StudentId: req.body.StudentId,
                  FirstName: req.body.FirstName,
                  LastName: req.body.LastName,
                  ClassId: req.body.ClassId,
                  Courses:courses
              }, function (err, data) {
                  if (err) return console.error(err);
                  console.log("we create student ");

                  //  res.send(data);
              });
              });
          }
      });
  },
  update: function(req, res, next){
    res.json({type: "Update", id: req.params.id, body: req.body });
  },
  delete: function(req, res, next){
    res.json({type: "Delete", id: req.params.id});
  },
    // updateCompany:function(id,field_to_edit) {
    //     db.collection('students').updateOne(id,{$set:field_to_edit});
    //     console.log("updated document");
    //     return db.collection('students').find({});
    //
    // },


    updateStudent:function(req, res, next) {
      console.log("updateStudent in server");
        res.send(" updateStudent in server");
    },

    updateGrades:function(req,res) {
console.log("updateGrades in the sever ");
        // UpdateStudentGrade:function (studentid, courseid, grade, evaluation)///Take out accurate details  V
        // {
        //     Student.findOne({StudentId: studentid}, function (err, data) {
        //         if (err) return console.error(err);
        //         else if (data == null)
        //             console.log("the student " + firstname + " " + lastname + "not  exists");
        //         else {
        //             for (var i = 0; i < data.Courses.length; i++)
        //                 if (data.Courses[i].CourseId == courseid) {
        //                     console.log("find corse id" + courseid);
        //                     // data.Courses[i].update({Grade: grade, VerbalEvaluation:evaluation}, function (err, data) {
        //                     data.Courses[i].Grade = grade;
        //                     data.Courses[i].VerbalEvaluation = evaluation;
        //                     Student.update({Courses: data.Courses}, function (err, data) {
        //                         if (err) return console.error(err);
        //                         console.log("update " + courseid);
        //                     });
        //                 }
        //         }
        //
        //     });
        // }
    },
    getAll: function(req, res, next){
    Students.find(function(err, data){
      if(err) console.error;
      res.json(data);
    })
  } ,
    createStudent:function(req, res, next)//the Function create student
    {console.log("in the server");
        // student.findOne({StudentId: studentid},function (err, data) {
        //     if (err) return console.error(err);
        //     else if (data!=null)
        //         console.log("the student "+firstname+ " " +lastname+ " already exists");
        //     else
        //     {
                student.create({FirstName: req.query(fName),LastName:req.query(lName)}, function (err, data) {
                    if (err) return console.error(err);
                    console.log("we create student "+firstname);
                    res.send(data);
                });
            //}

       // });

    }
}


// var u=update("ddd");


// Return the object
module.exports =student;