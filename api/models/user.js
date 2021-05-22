const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  // firstname: { type: String, required: true },
  // lastName: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
//  phone: { type: String, required: true },
  password: { type: String, required: true },
 // profilePhotot: { type: String },
  role : {
    type: [{
      type: String,
      enum: ['admin', 'seller', 'buyer']
    }],
    default: ['buyer']
  }
});

module.exports = mongoose.model("User", userSchema);
