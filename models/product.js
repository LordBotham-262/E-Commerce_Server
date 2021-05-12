const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    rating : Number,
    imageId: String,
    catId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductType'
    },
    variations :  [
        {
            size : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Size'
            },
            color: {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Color'
            },
            stock: Number,
            price : Number,
            imageId : String
        }
    ],
})

module.exports = mongoose.model('Product',productSchema);





