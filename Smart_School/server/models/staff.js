var mongoose = require('mongoose');

var schema = {
    StaffId: String,
    FirstName:String,
    LastName: String,
    ListClass:[],
    Type:String
}

var Staff = mongoose.model("Staff", schema);


module.exports =  mongoose.model('staff',{
    StaffId: String,
    FirstName:String,
    LastName: String,
    ListClass:[],
    Type:String

});