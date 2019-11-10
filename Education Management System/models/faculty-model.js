var db = require('./db');

module.exports={

	getById: function(id, callback){

		var sql = "select * from faculty where username=?";
		db.getResults(sql, [id], function(result){
			if(result.length > 0 ){
				callback(result);
			}else{
				callback([]);
			}
		});
	},
	validate: function(user, callback){
		var sql = "select * from faculty where username=? and password=?";

		db.getResults(sql, [user.username, user.password], function(result){

			if(result.length > 0 ) {
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAll : function(callback){
		var sql = "select * from faculty";

		db.getResults(sql, [], function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	insert : function(user, callback){
		var sql = "insert into faculty values(?, ?, ?,?,?,?,?,?,?)";
		db.execute(sql, [user.fname, user.lname,user.mobile,user.email,user.username,user.password,user.courses,user.gender,user.image], function(status){
			callback(status);
		});
	},
	update : function(user, callback){
		var sql = "update faculty set fname=?,lname=?,mobile=?,email=?, password=?,courses=?,gender=?,image=? where username=?";		
			db.execute(sql, [user.fname, user.lname,user.mobile,user.email,user.password,user.courses,user.gender,user.image,user.username], function(status){
				callback(status);
			});
		
	},
	delete : function(user, callback){
		var sql = "delete from faculty where username=?";
		db.execute(sql, [user],  function(status){
			callback(status);
		});
	}
}	