//EXPRESS
var express = require('express');
var app = express();

// DATABASE
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/database');

var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'); 
var jwt = require('jsonwebtoken');
var env = require('node-env-file');

//Includes
var backend = require('./backend/generic/generic.js');
var users = require('./backend/users/users.js');

/* Config */
var port = process.env.PORT || 8080;

//ENV VARIABLES
env(__dirname + '/.env');

//PARSERS 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//MORGAN LOGGING IN DEV MODE
app.use(morgan('dev'));

/* PUBLIC API ROUTES */
app.get('/api', backend.generic);
app.get('/create', backend.create);
app.get('/data', backend.findAll);

// PRIVATE API ROUTES
var authRoutes = express.Router();

authRoutes.post('/new', users.newUser);
authRoutes.post('/authenticate', users.authenticate);
authRoutes.use(users.verify);
authRoutes.get('/checkLogin', users.checkLogin);
authRoutes.get('/logout', users.logOut);

app.use('/api/auth', authRoutes);


/* ANGULAR FRONT END REDIRECTS */
app.use('/css/', express.static(__dirname + '/dist/css/'));
app.use('/js/', express.static(__dirname + '/dist/js/'));
app.use('/templates/', express.static(__dirname + '/dist/templates/'));

// GLOBAL REDIRECT
app.use('*', function(req, res){
	res.sendFile(__dirname + '/dist/');
});

/* Start app and log it */
app.listen(port, function(){
	console.log("App active and running on: " + port);
});
