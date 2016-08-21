var express = require('express');
var app = express();

var backend = require('./backend/app.js');

/* Config */
var port = process.env.PORT || 8080;

/* API ROUTES */
app.get('/api', backend.generic);


/* ANGULAR FRONT END */
app.use('/css/', express.static(__dirname + '/dist/css/'));
app.use('/js/', express.static(__dirname + '/dist/js/'));
app.use('/templates/', express.static(__dirname + '/dist/templates/'));

app.use('*', function(req, res){
	res.sendFile(__dirname + '/dist/');
});

/* Start app and log it */
app.listen(port, function(){
	console.log("App active and running on: " + port);
});
