var mongoose = require('mongoose');

var schema = {
    ClassId:String,
    ClassName:String,
    EducatorId:String,
    CoordinatorId:String,
    Students:[],
    Courses:[]

}

var Classes = mongoose.model("Classes", schema);

module.exports =  mongoose.model('classes',{
    ClassId:String,
    ClassName:String,
    EducatorId:String,
    CoordinatorId:String,
    Students:[],
    Courses:[]
});