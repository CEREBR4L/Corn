
/* DB CONFIG */
/*var dbSchema = new Schema({
	field: String
});

var corn = connect.model('corn', dbSchema);

*/
/* ROUTING EXPORTED FUNCTIONS */
exports.generic = function(req, res){
	res.send(welcome("Welcome to the API"));
};


/* CUSTOM LOCAL FUNCTIONS */
function welcome(message){
	return message;
};

