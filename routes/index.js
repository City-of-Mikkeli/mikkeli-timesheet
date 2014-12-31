var common = require('./components/common');
var user = require('./components/user');
var costcenter = require('./components/costcenter');
var price = require('./components/price');
var project = require('./components/project');
var work = require('./components/work');
var customer = require('./components/customer');
var report = require('./components/report');

module.exports = function (app, passport){
	
	var authenticate = function(req, res, next){
		if (req.isAuthenticated()){
			if(req.user.local.newuser && req.path !== '/setpass') {
				res.redirect('/setpass');
			}else{
				return next();
			}
		}else{
			res.redirect('/login');
		}
	};

	/** Common routes **/
	
	app.get('/', authenticate, common.index);
	app.get('/login', common.login);
	app.get('/setpass', common.setpass);
	app.get('/projectlist', authenticate, common.projectlist);
	app.get('/userlist', authenticate, common.userlist);
	app.get('/costcenterlist', authenticate, common.costcenterlist);
	app.get('/customerlist', authenticate, common.customerlist);
	app.get('/report', authenticate, common.report);
	
	/** Report routes **/
	
	app.post('/report/pdf', authenticate, report.pdf);
	app.post('/report/xls', authenticate, report.xls);
	
	/** Work routes **/
	
	app.post('/work', authenticate, work.add);
	app.get('/work/:start/:end', authenticate, work.findByStartAndEnd);
	app.get('/lockwork/:id', authenticate, work.lock);
	
	/** Customer routes **/
	
	app.post('/customer', authenticate, customer.add);
	app.get('/customer', authenticate, customer.list);
	app.get('/customer/:id', authenticate, customer.listById);
	
	/** Cost center routes **/
	
	app.post('/costcenter', authenticate, costcenter.add);
	app.post('/costcenter/:id', authenticate, costcenter.update);
	app.get('/costcenter', authenticate, costcenter.list);
	
	/** Price routes **/
	
	app.post('/price', authenticate, price.add);
	app.get('/price', authenticate, price.list);
	
	/** Project routes **/
	
	app.post('/project', authenticate, project.add);
	app.get('/project', authenticate, project.list);
	app.get('/project/:id', authenticate, project.listById);
	
	/** User routes **/
	
	app.post('/login', user.login);
	app.post('/signup', user.signup);
	app.get('/user', authenticate, user.list);
	app.post('/user', authenticate, user.add);
	app.get('/logout', user.logout);
	app.post('/setpass', authenticate, user.setpass);
	
};
