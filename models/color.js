const mongoose = require('mongoose');

const colorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : String,
    value : String
});

module.exports = mongoose.model('Color',colorSchema);