var db = require('./db');

module.exports={

	getById: function(id, callback){
		var sql = "select * from admin where username=?";
		db.getResults(sql, [id], function(result){
			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	validate: function(user, callback){
		var sql = "select * from admin where username=? and password=?";

		db.getResults(sql, [user.username, user.password], function(result){

			if(result.length > 0 ) {
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAll : function(callback){
		var sql = "select * from admin";

		db.getResults(sql, [], function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	insert : function(user, callback){
		var sql = "insert into admin values('', ?, ?)";
		db.execute(sql, [user.username, user.password], function(status){
			callback(status);
		});
	},
	update : function(user, callback){
		var sql = "update admin set fname=?,lname=?,mobile=?,email=?, password=?,gender=?,image=? where username=?";		
			db.execute(sql, [user.fname,user.lname,user.mobile,user.email, user.password,user.gender,user.image,user.username], function(status){
				callback(status);
			});
		
	},
	delete : function(user, callback){
		var sql = "delete from admin where username=?";
		db.execute(sql, [],  function(status){
			callback(status);
		});
	}
}	