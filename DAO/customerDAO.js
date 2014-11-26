var Customer = require('../model/customer');

exports.create = function(name, callback){
	var customer = new Customer({
		name : name
	});
	customer.save(function(err, customer){
		if(err)
			throw err;
		
		callback(customer);
	});
};

exports.list = function(callback) {
	Customer.find({}, function(err, customers){
		if(err)
			throw err;
		
		callback(customers);
	});
};

exports.findById = function(id, callback){
	Customer.findOne({'_id': id }, function(err, customer){
		if(err)
			throw err;
		
		callback(customer);
	});
};