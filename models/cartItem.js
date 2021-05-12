const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity : Number,
    size : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Size'
    },
    color : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Color'
    },
    user : String
});

module.exports = mongoose.model('ProductType',productTypeSchema);