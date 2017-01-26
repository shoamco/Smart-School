


var mongoose = require('mongoose');

var schema = {
    StaffId: String,
    FirstName:String,
    LastName: String,
    ListClass:[],
    Type:String,
	user:String,
	password:String
}

var Users = mongoose.model("Users", schema);

module.exports =  mongoose.model('user',{
    StaffId: String,
    FirstName:String,
    LastName: String,
    ListClass:[],
    Type:String,
	user:String,
	password:String
});
