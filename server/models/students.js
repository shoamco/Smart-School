var mongoose = require('mongoose');

var schema = {
    StudentId: String,
    FirstName: String,
    LastName: String,
    ClassId: String,
    Courses:[]
	
}

var Students = mongoose.model("Students", schema);

module.exports =  mongoose.model('student',{
    StudentId: String,
    FirstName: String,
    LastName: String,
    ClassId: String,
    Courses:[]
});