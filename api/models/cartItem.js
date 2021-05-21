const mongoose = require("mongoose");

const cartItemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
      {
          productId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          variantId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product.variations",
            required: true,
          },
          quantity : { type: Number, default: 1 },
      }
  ] ,
  status: {
    type: [{
      type: String,
      enum: ['active', 'stale']
    }],
    default: ['active']
  }
});

module.exports = mongoose.model("CartItem", cartItemSchema);