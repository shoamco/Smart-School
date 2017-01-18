var mongoose = require('mongoose');

var schema = {
    ClassId:String,
    Educator:String,
    //Img:
  //  Courses:[courseSchema]

}

var Classes = mongoose.model("Classes", schema);

module.exports =  mongoose.model('classes',{
    ClassId:String,
    Educator:String,
    //Img:
    //  Courses:[courseSchema]
});