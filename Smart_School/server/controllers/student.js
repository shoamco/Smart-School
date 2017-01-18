var Students = require('../models/students');
// Wrap all the methods in an object

var student = {
  read: function(req, res, next){
    res.json({type: "Read", id: req.params.id});
  },
  create: function(req, res, next){
    res.send(req.body);
  },
  update: function(req, res, next){
    res.json({type: "Update", id: req.params.id, body: req.body });
  },
  delete: function(req, res, next){
    res.json({type: "Delete", id: req.params.id});
  },
    updateGrades:function(req,res) {

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
  } 
}

// Return the object
module.exports =student;