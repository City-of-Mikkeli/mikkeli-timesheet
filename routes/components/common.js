exports.index = function(req, res){
	res.render('index', {
		user : req.user
	});
};

exports.projectlist = function(req, res) {
	res.render('list', {title: 'Projektit', handler: 'project_list.js'});
};

exports.userlist = function(req, res) {
	res.render('list', {title: 'Käyttäjät', handler: 'user_list.js'});
};

exports.costcenterlist = function(req, res) {
	res.render('list', {title: 'Kustannuspaikat', handler: 'costcenter_list.js'});
};

exports.customerlist = function(req, res) {
	res.render('list', {title: 'Tilaajat', handler: 'customer_list.js'});
};

exports.login = function(req, res){
	res.render('login');
};

exports.setpass = function(req, res){
	res.render('setpass');
};