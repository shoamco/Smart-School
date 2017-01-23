<<<<<<< HEAD
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

var Staff = mongoose.model("Staff", schema);


module.exports =  mongoose.model('staff',{
    StaffId: String,
    FirstName:String,
    LastName: String,
    ListClass:[],
    Type:String,
	user:String,
	password:String
=======
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

var Staff = mongoose.model("Staff", schema);


module.exports =  mongoose.model('staff',{
    StaffId: String,
    FirstName:String,
    LastName: String,
    ListClass:[],
    Type:String,
	user:String,
	password:String
>>>>>>> e2d0e297f0fa47e4ccf1ffc380283c08ad9bff2c
});