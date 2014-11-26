var workDAO = require('../../DAO/workDAO');

exports.add = function(req, res) {
	if(req.body._id != ''){
		workDAO.update(
				req.body._id,
				req.body.hours,
				req.body.description,
				req.user,
				req.body.price,
				req.body.costcenter,
				req.body.project,
				req.body.date,
				req.body.customer,
				function(work){
					res.redirect('/');
				}
		);
	}else{
		workDAO.create(
				req.body.hours,
				req.body.description,
				req.user,
				req.body.price,
				req.body.costcenter,
				req.body.project,
				req.body.date,
				req.body.customer,
				function(work){
					res.redirect('/');
				}
		);
	}
};

exports.findByStartAndEnd = function(req, res) { //TODO: allow manager or admin roles to see also other persons hours
	var start = req.param('start');
	var end = req.param('end');
	var user = req.user._id;
	workDAO.findByStartAndEndAndUser(start, end, user, function(works) {
		res.send(works);
	});
};

exports.lock = function(req, res) {
	var id = req.param('id');
	workDAO.lock(id, function(work){
		res.send(work);
	});
};
