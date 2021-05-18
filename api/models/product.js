const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0 },
  imagePath: { type: String, required: true },
  catId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductType",
    required: true,
  },
  variations: [
    {
      size: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Size",
      },
      color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Color",
      },
      stock: { type: Number, default: 0 },
      price: { type: Number, required: true },
      imageId: { type: String },
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
