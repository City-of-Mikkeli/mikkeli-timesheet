var projectDAO = require('../../DAO/projectDAO');

exports.add = function(req, res){
	projectDAO.create(req.body.name, req.body.description, req.body.customers, function(project){
		res.redirect('/');
	});
};
	
exports.list = function(req, res){
	projectDAO.list(function(projects){
		res.send(projects);
	});
};

exports.listById = function(req, res) {
	var id = req.param('id');
	projectDAO.findById(id, function(project){
		res.send(project);
	});
};