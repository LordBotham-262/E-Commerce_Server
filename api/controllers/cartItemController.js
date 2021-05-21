const CartItem = require("../models/cartItem");
const Product = require("../models/product");
const mongoose = require("mongoose");
const { update } = require("../models/cartItem");

exports.cartItem_getAll = (req, res, next) => {
  if (req.query.cartId) {
    queryFilter = { _id: req.query.cartId };
  } else if (req.query.userId) {
    queryFilter = { userId: req.query.userId };
  } else {
    return res.status(400).json({
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

exports.cartItem_createCart = (req, res, next) => {
  const cartItem = new CartItem({
    _id: new mongoose.Types.ObjectId(),
    userId: req.query.userId,
  });
  cartItem
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

exports.cartItem_putOne = (req, res, next) => {
  if (!req.query.userId) {
    return res.status(400).json({
      error: "Query is empty",
    });
  }

  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) throw new Error("Product not Found");
      return product;
    })
    .then((docs) => {
      const data = req.body;
      var query_newData = {
        userId: req.query.userId,
        products: {
          $not: {
            $elemMatch: {
              productId: data.productId,
              variantId: data.variantId,
            },
          },
        },
      };
      var update_newData = { $addToSet: { products: data } };

      var query = {
        userId: req.query.userId,
        "products.productId": data.productId,
        "products.variantId": data.variantId,
      };

      var update = { $set: { "products.$": data } };
      CartItem.updateOne(query_newData, update_newData, { new: true })
        .then((result) => {
          if (result.nModified === 0) {
            return CartItem.updateOne(query, update, { new: true });
          } else return result;
        })
        .then((docs) => {
          res.status(201).json({
            message: "Item added to user Cart",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err.message,
      });
    });
};

exports.cartitem_delete = (req, res, next) => {
  if (req.query.cartItemId) {
    queryFilter = { "products._id": req.query.cartItemId };
  } else {
    return res.status(400).json({
      error: "Query is empty",
    });
  }
  CartItem.updateOne(queryFilter, {
    $pull: { products: { _id: req.query.cartItemId } },
  })
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

exports.cartItem_clearCart = (req, res, next) => {
  if (req.query.userId) {
    queryFilter = { userId: req.query.userId };
  } else {
    return res.status(400).json({
      error: "Query is empty",
    });
  }
  CartItem.updateOne(queryFilter, { $pull: { products: {} }})
    .then((docs) => {
      res.status(200).json({
        message: "Cart cleared for User" + req.query.userId,
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
    queryFilter = { userId: mongoose.Types.ObjectId(req.query.userId ) };
  } else {
    return res.status(500).json({
      error: "Query is empty",
    });
  }

  CartItem.aggregate([
  { "$unwind": "$products" },
   { $match: {} },
    {
      $group: {
        _id: req.query.userId,
        cartCount: { $sum: "$products.quantity" },
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
