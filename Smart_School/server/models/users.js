var mongoose = require('mongoose');

var schema = {
    UserId: String,
    UserName: String,
    //Img:

  ClassList:[]
	
}

var Users = mongoose.model("Users", schema);

module.exports =  mongoose.model('user',{
    UserId: String,
    UserName: String,
    //Img:" "
    ClassList:[]
});

