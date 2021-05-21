const mongoose = require("mongoose");

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
console.log(req.body.products)
  if ((req.body).length < 1){
    return res.status(400).json({
      message: "No products found in Cart",
    });
  }

  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    userId: req.query.userId,
    products: req.body,
    activeStatus: true,
  });
  order
    .save()
    .then((docs) => {
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

exports.Order_editOrder = (req,res,next) => {

};
