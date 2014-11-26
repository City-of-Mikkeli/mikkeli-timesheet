var Project = require('../model/project');

exports.create = function(name, description, customers, callback){
	var newProject = new Project();
	newProject.name = name;
	newProject.description = description;
	newProject.customers = customers;
	newProject.save(function(err, project){
		if(err)
			throw err;
		
		callback(project);
	});
	
};

exports.list = function(callback){
	Project.find({}, function(err, projects){
		if(err)
			throw err;
		
		callback(projects);
			
	});
};

exports.findById = function(id, callback){
	Project.findOne({'_id': id }, function(err, project){
		if(err)
			throw err;
		
		callback(project);
	});
};