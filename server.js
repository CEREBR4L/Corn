//EXPRESS
const express = require('express');
const app = express();

// DATABASE
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/database');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const jwt = require('jsonwebtoken');
const env = require('node-env-file');

//Includes
const backend = require('./backend/generic/generic.js');
const users = require('./backend/users/users.js');

/* Config */
const port = process.env.PORT || 8080;

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
const authRoutes = express.Router();

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
app.use('*', (req, res) => {
	res.sendFile(__dirname + '/dist/');
});

/* Start app and log it */
app.listen(port, () => {
	console.log("App active and running on: " + port);
});
