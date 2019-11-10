//DECLARATION
var express  	= require('express');
var ejs  		= require('ejs');
var bodyParse  	= require('body-parser');
var exSession  	= require('express-session');
var cookieParser= require('cookie-parser');
var admin  		= require('./controllers/admin');
var course  	= require('./controllers/course');
var faculty  	= require('./controllers/faculty');
var student  	= require('./controllers/student');
var login  		= require('./controllers/login');
var logout  	= require('./controllers/logout');
var app 		= express();


//CONGIFURATION
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(bodyParse.urlencoded({extended:false}));
app.use(exSession({secret:"my top secret value", saveUninitialized:true, resave:false}));
app.use(cookieParser());
app.use('/admin', admin);
app.use('/course', course);
app.use('/faculty', faculty);
app.use('/student', student);
app.use('/login', login);
app.use('/logout', logout);

//ROUTING
app.get('/', function(req, res){
	res.send('<h2>hello from express</h2>');
});

//SERVER STARTUP
app.listen(3000, function(){
	console.log('server started at 3000...');
});
