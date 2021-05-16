const mongoose = require("mongoose");

const colorSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  value: { type: String, required: true },
});

module.exports = mongoose.model("Color", colorSchema);
