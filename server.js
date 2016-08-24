var express = require('express');
var app = express();

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27018/database');

var backend = require('./backend/app.js');

/* Config */
var port = process.env.PORT || 8080;

/* API ROUTES */
app.get('/api', backend.generic);
app.get('/create', backend.create);
app.get('/data', backend.findAll);


/* ANGULAR FRONT END */
app.use('/css/', express.static(__dirname + '/app/css/'));
app.use('/js/', express.static(__dirname + '/app/js/'));
app.use('/templates/', express.static(__dirname + '/app/templates/'));

app.use('*', function(req, res){
	res.sendFile(__dirname + '/app/');
});



/* Start app and log it */
app.listen(port, function(){
	console.log("App active and running on: " + port);
});
