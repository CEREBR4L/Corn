var express = require('express');
var app = express();

var mongoose = require('mongoose');
//var connect = mongoose.connect('mongodb://127.0.0.1:27018/Corn');

var corn = require('./server/models/corn.js')

/* Config */
var port = process.env.PORT || 8080;

/* ROUTING */
app.get('/api', corn.generic);


/* FRONTEND */
app.use('/css/', express.static(__dirname + '../dist/css/'));
app.use('/js/', express.static(__dirname + '../dist/js/'));
app.use('/Scripts/', express.static(__dirname + '../dist/js/'));
app.use('/templates/', express.static(__dirname + '../dist/templates/'));

app.use('*', function(req, res){
	res.sendFile(__dirname + '/dist/');
});


/* App Start */
app.listen(port, function(){
	console.log("App active and running on: " + port);
});
