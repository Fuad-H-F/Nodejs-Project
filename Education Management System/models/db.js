var mysql   = require('mysql');

var getConnection = function(){

	var connection = mysql.createConnection({
		host:'localhost',
		user: 'root',
		password: '',
		database: 'education management system'
	});
	 
	connection.connect(function(err) {
	  if (err) {
	    console.error('error connecting: ' + err.stack);
	    return;
	  }
	  console.log('connected as id ' + connection.threadId);
	});

	return connection;
}

module.exports={

	getResults: function(sql, params, callback){

		if(params != null){
			var connection = getConnection();
			connection.query(sql, params, function(error, results){
				callback(results);
			});

			connection.end(function(err) {
			  console.log("Database connection is terminated.");
			});

		}else{

			var connection = getConnection();
			connection.query(sql, function(error, results){
				callback(results);
			});

			connection.end(function(err) {
			  console.log("Database connection is terminated.");
			});
		}	
	},
	execute: function(sql, params, callback){

		if(params != null){
			var connection = getConnection();
			connection.query(sql, params, function(error, results){

				if(error){
					callback(false);
				}else{
					callback(true);
				}
			});

			connection.end(function(err) {
			  console.log("Database connection is terminated.");
			});
		}else{
			var connection = getConnection();
			connection.query(sql, function(error, results){

				if(error){
					callback(false);
				}else{
					callback(true);
				}
			});

			connection.end(function(err) {
			  console.log("Database connection is terminated.");
			});
		}
	}
}

