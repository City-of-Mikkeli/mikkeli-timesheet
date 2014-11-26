var User = require('../model/user');

exports.list = function(callback){
	User.find({}, function(err, users){
		if(err)
			throw err;
		
		callback(users);
	});
};

exports.create = function(email, password, role, callback){
	var user = new User(); //TODO check if user exists
	user.local.email = email;
	user.local.password = user.generateHash(password);
	user.local.role = role;
	user.save(function(err, user){
		if(err)
			throw err;
		
		callback(user);
	});
};

exports.updatePassword = function(id, password, callback){
	User.findOne({_id: id}, function(err, user){
		if(err)
			throw err;
		
		user.local.password = user.generateHash(password);
		user.local.newuser = false;
		user.save(function(err, user){
			callback(user);
		});
	});
};