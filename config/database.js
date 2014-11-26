var db = {
	/*
	 * Host for the database
	 */
	'host' : 'localhost',
	
	/*
	 * Name of the database that app will use
	 */
	'database' : 'timeManager'
};

exports.getDbUrl = function(){
	return 'mongodb://'+db.host+'/'+db.database;
};