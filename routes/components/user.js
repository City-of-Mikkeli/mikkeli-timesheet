var passport = require('passport');
var userDAO = require('../../DAO/userDAO');

exports.login = passport.authenticate('local-login', {
	successRedirect : '/',
	failureRedirect : '/login',
	failureFlash : false
});

exports.signup = passport.authenticate('local-signup', { //TODO: is necessary?
	successRedirect : '/',
	failureRedirect : '/login', //TODO: add signup page
	failureFlash : false
});

exports.add = function(req, res){
	userDAO.create(req.body.email, req.body.password, req.body.role, function(user){
		res.send(user);
	});
};

exports.list = function(req, res){
	userDAO.list(function(users){
		res.send(users);
	});
};

exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};

exports.setpass = function(req, res) {
	var pass = req.body.pass;
	if(req.body.pass2 !== pass){
		res.send('ERROR, passwords dont match');
	}else{
		userDAO.updatePassword(req.user._id, pass, function(user){
			res.redirect('/');
		});
	}
};