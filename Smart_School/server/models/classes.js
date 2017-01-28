var mongoose = require('mongoose');

var schema = {
    ClassId:String,
    ClassName:String,
    Educator:String,
    EducatorId:String,
    //Img:
  //  Courses:[courseSchema]
    Students:[],
    Courses:[]

}

var Classes = mongoose.model("Classes", schema);

module.exports =  mongoose.model('classes',{
    ClassId:String,
    Educator:String,
    EducatorId:String,
    ClassName:String,
    Students:[],
    Courses:[]
    //Img:
    //  Courses:[courseSchema]
});