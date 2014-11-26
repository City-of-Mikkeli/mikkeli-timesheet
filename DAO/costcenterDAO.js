var CostCenter = require('../model/cost_center');

exports.create = function(name, number, callback){
	var costCenter = new CostCenter({
		name : name,
		number : number
	});
	costCenter.save(function(err, costCenter){
		if(err)
			throw err;
		
		callback(costCenter);
	});
};

exports.list = function(callback) {
	CostCenter.find({}, function(err, costcenters){
		if(err)
			throw err;
		
		callback(costcenters);
	});
};

exports.update = function(id, name, number, callback){
	CostCenter.findOne({_id: id}, function(err, costcenter){
		if(err)
			throw err;
		
		costcenter.name = name;
		costcenter.number = number;
		costcenter.save(function(err, costcenter){
			if(err)
				throw err;
			
			callback(costcenter);
		});
	});
};