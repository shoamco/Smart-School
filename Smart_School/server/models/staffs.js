var mongoose = require('mongoose');

var schema = {
	name: String,
	price: Number,
	category: String,
	image: String,
}

var Staff = mongoose.model("Staff", schema);

module.exports = Staff;