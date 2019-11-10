var db = require('./db');

module.exports={

	getById: function(id, callback){

		var sql = "select * from course where name=?";
		db.getResults(sql, [id], function(result){
			if(result.length > 0 ){
				callback(result);
			}else{
				callback([]);
			}
		});
	},
	validate: function(user, callback){
		var sql = "select * from course where username=? and password=?";

		db.getResults(sql, [user.username, user.password], function(result){

			if(result.length > 0 ) {
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAll : function(callback){
		var sql = "select * from course";

		db.getResults(sql, [], function(results){

			if(results.length > 0 ) {
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	insert : function(user, callback){
		var sql = "insert into course values('', ?, ?,?,?)";
		db.execute(sql, [user.day, user.time,user.name,user.faculty], function(status){
			callback(status);
		});
	},
	update : function(user, callback){
		var sql = "update course set day=?,time=?,name=?,faculty=? where id=?";		
			db.execute(sql, [user.day, user.time,user.name,user.faculty,user.id], function(status){
				callback(status);
			});
		
	},
	delete : function(user, callback){
		var sql = "delete from course where id=?";
		db.execute(sql, [user],  function(status){
			callback(status);
		});
	}
}	