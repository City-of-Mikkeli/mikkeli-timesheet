var costcenterDAO = require('../../DAO/costcenterDAO');	

exports.add = function(req, res){
	costcenterDAO.create(req.body.name, req.body.number, function(costcenter){
		res.redirect('/');
	});
};

exports.list = function(req, res){
	costcenterDAO.list(function(costcenters) {
		res.send(costcenters);
	});
};

exports.update = function(req, res){
	var id = req.param('id');
	costcenterDAO.update(id, req.body.name, req.body.number, function(costcenter){
		res.send(costcenter);
	});
};