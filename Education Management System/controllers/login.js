var express 		= require('express');
var adminModel 		= require('./../models/admin-model');
var facultyModel	= require('./../models/faculty-model');
var studentModel	= require('./../models/student-model');



var router 	= express.Router();
var app 	= express();

router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', function(req, res){
	
	var user = {
		username: req.body.username,
		password: req.body.password
	}
	var usertype= req.body.username.split("-");
	
	if(usertype[0]=="a"){
		adminModel.validate(user, function(status){
			if(status){
				res.cookie('username', req.body.username);
				res.redirect('/admin');	
			}else{
				res.send('invalid username/password');
			}
		});
	}else if(usertype[0]=="f"){
		facultyModel.validate(user, function(status){
			if(status){
				res.cookie('username', req.body.username);
				res.redirect('/faculty');	
			}else{
				res.send('invalid username/password');
			}
		});
	}else if(usertype[0]=="s"){
		studentModel.validate(user, function(status){
			if(status){
				res.cookie('username', req.body.username);
				res.redirect('/student');	
			}else{
				res.send('invalid username/password');
			}
		});
	}else{
		res.send('invalid username');
	}
});

module.exports = router;


