var mongoose = require('mongoose');

var schema = {
    StudentId: String,
    FirstName: String,
    LastName: String,
    //Img:
    ClassId: String,
  //  Courses:[courseSchema]
	
}

var Students = mongoose.model("Students", schema);

module.exports =  mongoose.model('student',{
    StudentId: String,
    FirstName: String,
    LastName: String,
    //Img:
    ClassId: String,
    //  Courses:[courseSchema]
});