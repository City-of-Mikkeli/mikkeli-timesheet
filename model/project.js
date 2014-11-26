var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
	name: String,
	description: String,
	archieved: { type: Boolean, default: false},
	customers : Array,
	created: {type: Date, default: Date.now()}
});

projectSchema.methods.addCustomer = function(customer){
	this.curstomers.push(customer);
};

module.exports = mongoose.model('Project', projectSchema);