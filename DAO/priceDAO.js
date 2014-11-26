var Price = require('../model/price');

exports.create = function(user, name, price, callback){
	var newPrice = new Price();
	newPrice.user_id = user._id;
	newPrice.name = name;
	newPrice.price = price;
	newPrice.save(function(err, price){
		if(err)
			throw err;
		
		callback(price);
	});
	
};

exports.listByUser = function(user, callback){
	Price.find({'user_id': user._id }, function(err, prices){
		if(err)
			throw err;
		
		callback(prices);
	});
};

exports.findById = function(id, callback){
	Price.findOne({'_id': id }, function(err, price){
		if(err)
			throw err;
		
		callback(price);
	});
};