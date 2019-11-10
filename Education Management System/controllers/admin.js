var express = require('express');
var { check, validationResult } = require('express-validator');
var adminModel = require('./../models/admin-model');
var router = express.Router();

router.get('/', function(req, res){
	if(req.cookies['username'] != null){
		res.render('admin/index');
	}else{
		res.redirect('/login');
	}
});
router.get('/profile', function(req, res){
	adminModel.getById(req.cookies['username'],function(results){
		if(req.cookies['username'] != null){
			res.render('admin/profile', {user: results});
		}else{
			res.redirect('/login');
		}
	});
});
router.get('/edit', function(req, res){
		if(req.cookies['username'] != null){
			var errors={
				email: "",
				password:"",
				fname:"",
				lname:"",
				mobile:"",
				gender:""
			}
			res.render('admin/edit',{error: errors});
		}else{
			res.redirect('/login');
		}
});
router.post('/edit', [
	check('email',"**Invalid Email or Email Empty").isEmail(),
	check('password',"**password must be 4 to 20 character and not empty").isLength({ min: 4,max:20 }),
	check('mobile',"**must be a number and not empty").isMobilePhone(),
	check('fname').isAlpha().withMessage('**Must be only alphabetical chars').isLength({ min: 4 }).withMessage('**Must be at least 4 chars long'),
	check('lname').isAlpha().withMessage('**Must be only alphabetical chars').isLength({ min: 4 }).withMessage('**Must be at least 4 chars long'),
	check('gender',"**Gender is required").not().isEmpty()
	], function(req, res){

	var errors = validationResult(req);
	console.log(errors.mapped());
	if (!errors.isEmpty()) {
		res.render('admin/edit', {error: errors.mapped()});
	}else{

		var user = {
			fname: req.body.fname,
			lname: req.body.lname,
			mobile: req.body.mobile,
			email: req.body.email,
			password: req.body.password,
			gender: req.body.gender,
			image: req.body.image,
			username:req.cookies['username']
		};

		adminModel.update(user, function(status){

			if(status){
				res.redirect('/admin/profile');
			}else{
				res.redirect('/admin/edit');
			}
		});
	}
});

module.exports = router;


