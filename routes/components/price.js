var priceDAO = require('../../DAO/priceDAO');	

exports.add = function(req, res){
		priceDAO.create(req.user, req.body.name, req.body.price, function(price){
			res.redirect('/');
		});
};
	
exports.list = function(req, res){
	priceDAO.listByUser(req.user, function(prices){
		res.send(prices);
	});
};