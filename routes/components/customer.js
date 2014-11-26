var customerDAO = require('../../DAO/customerDAO');

exports.add = function(req, res) {
	customerDAO.create(req.body.name, function(customer){
		res.redirect('/');
	});
};

exports.list = function(req, res) {
	customerDAO.list(function(customers){
		res.send(customers);
	});
};

exports.listById = function(req, res) {
	var id = req.param('id');
	customerDAO.findById(id, function(customer){
		res.send(customer);
	});
};