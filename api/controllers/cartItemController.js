const CartItem = require("../models/cartItem");
const Product = require("../models/product");
const mongoose = require("mongoose");

exports.cartItem_getAll = (req, res, next) => {
  if (req.query.cartId) {
    queryFilter = { _id: req.query.cartId };
  } else if (req.query.userId) {
    queryFilter = { userId: req.query.userId };
  } else {
    return res.status(500).json({
      error: "Query is empty",
    });
  }
  CartItem.find(queryFilter)
    .exec()
    .then((docs) => {
      res.status(200).json({
        documents: docs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.cartItem_postOne = (req, res, next) => {
  if(!req.query.userId){
    return res.status(500).json({
      error: "Query is empty",
    });
  }
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) throw new Error("Product not Found");

      const cartItem = new CartItem({
        _id: new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        quantity: req.body.quantity,
        size: req.body.size,
        color: req.body.color,
        userId: req.query.userId,
      });
      const validatedModel = cartItem.validateSync();
      if (!!validatedModel) throw validatedModel;
      else return cartItem;
    })
    .then((cartItem) => {
      return CartItem.updateOne(
        {
          $and: [
            { productId: cartItem.productId },
            { size: cartItem.size },
            { color: cartItem.color },
            { userId: cartItem.userId },
          ],
        },
        { quantity: cartItem.quantity },
        { upsert: true }
      );
    })
    .then((result) => {
      res.status(201).json({
        message: "Item added to cart successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.cartitem_delete = (req, res, next) => {
  if (req.query.cartId) {
    queryFilter = { _id: req.query.cartId };
  } else if (req.query.userId) {
    queryFilter = { userId: req.query.userId };
  } else {
    return res.status(500).json({
      error: "Query is empty",
    });
  }
  CartItem.deleteMany(queryFilter)
    .exec()
    .then((docs) => {
      res.status(200).json({
        message: "Cart Item deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.cartitem_getCount = (req, res, next) => {
  if (req.query.userId) {
    queryFilter = { userId: mongoose.Types.ObjectId(req.query.userId )};
  } else {
    return res.status(500).json({
      error: "Query is empty",
    });
  }
  CartItem.aggregate([
    { $match: { queryFilter } },
    {
      $group: {
        _id: req.query.userId,
        cartCount: { $sum: "$quantity" },
      },
    },
  ])
    .then((docs) => {
      res.status(200).json({
        message: docs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};
