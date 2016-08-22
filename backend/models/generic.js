var mongoose = require("mongoose");
var shortid = require('shortid');

var GenericSchema = new mongoose.Schema({
    _id: {
      type: String,
      'default': shortid.generate
    },
    title: String, 
    text: String
});

module.exports = mongoose.model('Generic', GenericSchema);
