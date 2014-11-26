var mongoose = require('mongoose');

var costcenterSchema = mongoose.Schema({
	name: String,
	number: Number
});

module.exports = mongoose.model('CostCenter', costcenterSchema);