var express = require('express');
var { check, validationResult } = require('express-validator');
var studentModel = require('./../models/student-model');
var router = express.Router();

router.get('/add', function(req, res, next){

	if(req.cookies['username'] != null){
		var errors={
			email: "",
			password:"",
			fname:"",
			lname:"",
			mobile:"",
			gender:"",
			username:"",
			courses:""
		}
		res.render('student/add',{error: errors});
	}else{
		res.redirect('/login');
	}
});
router.post('/add',
[
	check('email',"**Invalid Email or Email Empty").isEmail(),
	check('password',"**password must be 4 to 20 character and not empty").isLength({ min: 4,max:20 }),
	check('mobile',"**must be a number and not empty").isMobilePhone(),
	check('fname').isAlpha().withMessage('**Must be only alphabetical chars').isLength({ min: 4 }).withMessage('**Must be at least 4 chars long'),
	check('lname').isAlpha().withMessage('**Must be only alphabetical chars').isLength({ min: 4 }).withMessage('**Must be at least 4 chars long'),
	check('gender',"**Gender is required").not().isEmpty(),
	check('username',"**Username must be 4 to 20 character and not empty").isLength({ min: 4,max:20 }),
	check('courses',"**Courses Name is required").not().isEmpty(),
], 
function(req, res){
	var errors = validationResult(req);
	console.log(errors.mapped());
	if (!errors.isEmpty()) {
		res.render('student/add', {error: errors.mapped()});
	}else{
		var user = {
			fname: req.body.fname,
			lname: req.body.lname,
			mobile: req.body.mobile,
			email: req.body.email,
			username: req.body.username,
			password: req.body.password,
			courses: req.body.courses,
			gender: req.body.gender,
			image: req.body.image
		};

		studentModel.insert(user, function(status){
			if(status){
				res.redirect('/student/show');
			}else{
				res.redirect('/student/add');
			}
		});
	}
});
router.get('/show', function(req, res, next){
	studentModel.getAll(function(results){
		if(req.cookies['username'] != null){
			res.render('student/show', {user: results});
		}else{
			res.redirect('/login');
		}
	});
});


router.post('/show', function(req, res){
	if(req.cookies['username'] != null){
		studentModel.getById(req.body.search, function(result){
			console.log(result);
			res.render('faculty/show', {user: result});
		});
	}else{
		res.redirect('/login');
	}
});

router.get('/edit/:username', function(req, res){

	studentModel.getById(req.params.username, function(results){
		var errors={
			email: "",
			password:"",
			fname:"",
			lname:"",
			mobile:"",
			gender:"",
			courses:""
		}
		res.render('student/edit', {user: results[0],error: errors});		
	});

});

router.post('/edit/:username',
[
	check('email',"**Invalid Email or Email Empty").isEmail(),
	check('password',"**password must be 4 to 20 character and not empty").isLength({ min: 4,max:20 }),
	check('mobile',"**must be a number and not empty").isMobilePhone(),
	check('fname').isAlpha().withMessage('**Must be only alphabetical chars').isLength({ min: 4 }).withMessage('**Must be at least 4 chars long'),
	check('lname').isAlpha().withMessage('**Must be only alphabetical chars').isLength({ min: 4 }).withMessage('**Must be at least 4 chars long'),
	check('gender',"**Gender is required").not().isEmpty(),
	check('courses',"**Courses Name is required").not().isEmpty(),
], function(req, res){
	var errors = validationResult(req);
	console.log(errors.mapped());
	if (!errors.isEmpty()) {
		res.render('student/edit', {error: errors.mapped()});
	}else{
		var user = {
			fname: req.body.fname,
			lname: req.body.lname,
			mobile: req.body.mobile,
			email: req.body.email,
			username: req.params.username,
			password: req.body.password,
			courses: req.body.courses,
			gender: req.body.gender,
			image: req.body.image
		};
		studentModel.update(user, function(status){

			if(status){
				res.redirect('/student/show');
			}else{
				res.redirect('/admin');
			}
		});
	}
});

router.get('/delete/:username', function(req, res){
	
	var user = req.params.username;

	studentModel.delete(user, function(status){

		if(status){
			res.redirect('/student/show');
		}else{
			res.redirect('/admin');
		}
	});
});

module.exports = router;
