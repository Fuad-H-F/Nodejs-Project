var express = require('express');
var { check, validationResult } = require('express-validator');
var courseModel = require('./../models/course-model');
var router = express.Router();

router.get('/add', function(req, res, next){

	if(req.cookies['username'] != null){
		var errors={
			name: "",
			day:"",
			time:"",
			faculty:""
		}
		res.render('course/add',{error: errors});
	}else{
		res.redirect('/login');
	}
});
router.post('/add',
[
		check('name',"**Name is required").not().isEmpty(),
		check('day',"**day is required").not().isEmpty(),
		check('time',"**time is required").not().isEmpty(),
		check('faculty').isAlpha().withMessage('**Must be only alphabetical chars').isLength({ min: 4 }).withMessage('**Must be at least 4 chars long'),

], 	
function(req, res){

	var errors = validationResult(req);
	console.log(errors.mapped());
	if (!errors.isEmpty()) {
		res.render('course/add', {error: errors.mapped()});
	}else{
		var user = {
			name: req.body.name,
			day: req.body.day,
			time: req.body.time,
			faculty: req.body.faculty
		};

		courseModel.insert(user, function(status){
			if(status){
				res.redirect('/course/show');
			}else{
				res.redirect('/course/add');
			}
		});
	}
});
router.get('/show', function(req, res, next){
	courseModel.getAll(function(results){
		if(req.cookies['username'] != null){
			res.render('course/show', {user: results});
		}else{
			res.redirect('/login');
		}
	});
});

router.post('/show', function(req, res){
	if(req.cookies['username'] != null){
		courseModel.getById(req.body.search, function(result){
			console.log(result);
			res.render('course/show', {user: result});
		});
	}else{
		res.redirect('/login');
	}
});



router.get('/edit/:id', function(req, res){

	courseModel.getById(req.params.id, function(results){
		if(req.cookies['username'] != null){
			var errors={
				name: "",
				day:"",
				time:"",
				faculty:""
			}
			res.render('course/edit', {user: results[0],error: errors});		

		}else{
			res.redirect('/login');
		}		
	});
});

router.post('/edit/:id',
[
	check('name',"**Name is required").not().isEmpty(),
	check('day',"**day is required").not().isEmpty(),
	check('time',"**time is required").not().isEmpty(),
	check('faculty').isAlpha().withMessage('**Must be only alphabetical chars').isLength({ min: 4 }).withMessage('**Must be at least 4 chars long'),

], 
function(req, res){
	var errors = validationResult(req);
	console.log(errors.mapped());
	if (!errors.isEmpty()) {
		res.render('course/add', {error: errors.mapped()});
	}else{
		var user = {
			name: req.body.name,
			day: req.body.day,
			time: req.body.time,
			faculty: req.body.faculty,
			id: req.params.id
		};

		courseModel.update(user, function(status){

			if(status){
				res.redirect('/course/show');
			}else{
				res.redirect('/admin');
			}
		});
	}
});

router.get('/delete/:id', function(req, res){
	
	var user = req.params.id;

	courseModel.delete(user, function(status){

		if(status){
			res.redirect('/course/show');
		}else{
			res.redirect('/admin');
		}
	});
});

module.exports = router;
