var Generic = require('./model.js');

exports.generic = function(req, res){
	res.send("Welcome to the API");
};

exports.create = function(req, res){
	
	data = new Generic({
		title: "Welcome to the jungle",
		text: "This is a bit of text about welcoming you to a jungle of some sorts... yeah I have no idea either, really." 
	});

	data.save(function(err, dataObj){

		if(err){
			console.log("Error in 'create': " + err);
			return;
		}

		res.send({status: "data saved to the database"});

	});

};

exports.findAll = function(req, res){

	Generic.find({}, function(err, items){

		if(err){
			console.log("There was an error: " + err);
			return;
		}

		console.log("Got data!");
		res.json(items);

	});

};

