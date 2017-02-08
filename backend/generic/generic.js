const Generic = require('./model.js');

exports.generic = (req, res) => {
	res.send("Welcome to the API");
};

exports.create = (req, res) => {
	
	const data = new Generic({
		title: "Welcome to the jungle",
		text: "This is a bit of text about welcoming you to a jungle of some sorts... yeah I have no idea either, really." 
	});

	data.save((err, dataObj) => {

		if(err){
			console.log("Error in 'create': " + err);
			return;
		}

		res.send({status: "data saved to the database"});

	});

};

exports.findAll = (req, res) => {

	Generic.find({}, (err, items) => {

		if(err){
			console.log("There was an error: " + err);
			return;
		}

		console.log("Got data!");
		res.json(items);

	});

};

