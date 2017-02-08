const mongoose = require("mongoose");
const shortid = require('shortid');

const GenericSchema = new mongoose.Schema({
    _id: {
      type: String,
      'default': shortid.generate
    },
    title: String, 
    text: String
});

module.exports = mongoose.model('Generic', GenericSchema);
