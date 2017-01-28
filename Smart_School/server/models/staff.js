
var mongoose = require('mongoose');

var schema = {
    StaffId: String,
    StaffName: String,
    ListClass:[],
    Type:String,
	user:String,
	password:String
}

var Staff = mongoose.model("Staff", schema);


module.exports =  mongoose.model('staff', {
    StaffId: String,
    StaffName: String,
    ListClass: [],
    Type: String,
    user: String,
    password: String
});