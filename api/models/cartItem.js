const mongoose = require("mongoose");

const cartItemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, default: 1 },
  size: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Size",
    required: true,
  },
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Color",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("CartItem", cartItemSchema);