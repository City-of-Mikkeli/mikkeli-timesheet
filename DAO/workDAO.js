var Work = require('../model/work');

exports.create = function(hours, description, user, price, costcenter, project, date, customer, callback){
	var newWork = new Work();
	newWork.hours = hours;
	newWork.description = description;
	newWork.user_id = user._id;
	newWork.price_id = price;
	newWork.project_id = project;
	newWork.day = date;
	newWork.costcenter_id = costcenter;
	newWork.customer_id = customer;
	newWork.save(function(err, work){
		if(err)
			throw err;
		
		callback(work);
	});
	
};

exports.list = function(callback) {
	Work.find({}, function(err, works){
		if(err)
			throw err;
		
		callback(works);
	});
};

exports.findById = function(id, callback){
	Work.findOne({_id : id}, function(err, work){
		if(err)
			throw err;
		
		callback(work);
	});
}

exports.findByStartAndEndAndUser = function(start, end, user, callback) {
	Work.find({day : {$lte: end, $gte: start}, user_id: user}, function(err, works){
		if(err)
			throw err;
		
		callback(works);
	});
};

exports.update = function(_id, hours, description, user, price, costcenter, project, date, customer, callback){
	exports.findById(_id, function(work){
		work.hours = hours;
		work.description = description;
		work.user_id = user._id;
		work.price_id = price;
		work.project_id = project;
		work.day = date;
		work.costcenter_id = costcenter;
		work.customer_id = customer;
		
		work.save(function(err, work){
			if(err)
				throw err;
			
			callback(work);
		});
	});
};

exports.lock = function(id, callback){
	exports.findById(id, function(work){
		work.locked = true;
		work.save(function(err, work){
			if(err)
				throw err;
			
			callback(work);
		});
	});
};

