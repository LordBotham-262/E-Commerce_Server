const mongoose = require('mongoose');

const sizeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : String,
});

module.exports = mongoose.model('Size',sizeSchema);