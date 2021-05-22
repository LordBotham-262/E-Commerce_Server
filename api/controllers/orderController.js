const mongoose = require("mongoose");
const Cart = require("../models/cart");
const Order = require("../models/order");

exports.Order_getOrders = (req, res, next) => {
  userId = req.query.userId;
  orderId = req.query.orderId;

  if (userId) {
    queryFilter = { userid: userId };
  } else if (orderId) {
    queryFilter = { _id: orderId };
  } else queryFilter = {};

  Order.find(queryFilter)
    .exec()
    .then((docs) => {
      res.status(200).json({
        message: docs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

exports.Order_createOrder = (req, res, next) => {
  if (!req.query.userId) {
    return res.status(400).json({
      message: "Query is Empty",
    });
  }
  Cart.findOne({ userId: req.query.userId })
    .exec()
    .then((cart) => {
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        userId: req.query.userId,
        products: cart.products,
      });
      return order.save();
    })
    .then((docs) => {
      return Cart.deleteOne({userId : req.query.userId})
    })
    .then(docs => {
      res.status(201).json({
        message: docs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

exports.Order_editOrder = (req, res, next) => {
  let status = ["pending",'completed','cancelled', 'accepted'] 
  newStatus = req.query.newStatus;
  orderId = req.query.orderId;
  if (!status.includes(newStatus) || !orderId){
   return res.status(400).json({
    error: "Query is empty",
   }) 
  }

  Order.findOneAndUpdate({_id : orderId},{'status' : [newStatus]},{returnNewDocument : true})
  .exec()
  .then(docs=> {
    res.status(201).json({
      message : docs
    })
  })
  .catch(err => {
    res.status(500).json({
      message : err.message
    })
  })
};
