const Cart = require("../models/cart");
const Product = require("../models/product");
const mongoose = require("mongoose");
const { update } = require("../models/cart");

exports.Cart_getCart = (req, res, next) => {
  if (req.query.cartId) {
    queryFilter = { _id: req.query.cartId };
  } else if (req.query.userId) {
    queryFilter = { userId: req.query.userId };
  } else {
    return res.status(400).json({
      error: "Query is empty",
    });
  }
  Cart.find(queryFilter)
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

exports.Cart_createCart = (req, res, next) => {
  let userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({
      error: "Query is empty",
    });
  }

  Cart.find({ userId: userId })
    .exec()
    .then((docs) => {
      if (docs.length < 1) {
        const cart = new Cart({
          _id: new mongoose.Types.ObjectId(),
          userId: req.query.userId,
        });
        return cart.save();
      } else return docs;
    })
    .then((docs) => {
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
          Cart.updateOne(query_newData, update_newData, { new: true })
            .then((result) => {
              if (result.nModified === 0) {
                return Cart.updateOne(query, update, { new: true });
              } else return result;
            })
            .then((docs) => {
              res.status(201).json({
                message: "Item added to user Cart",
              });
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

exports.Cart_deleteCart = (req, res, next) => {
  if (req.query.userId) {
    queryFilter = { userId: req.query.userId };
  } else if (req.query.cartId) {
    queryFilter = { _id: req.query.cartId };
  } else {
    return res.status(400).json({
      error: "Query is empty",
    });
  }
  Cart.deleteOne(queryFilter)
    .then((docs) => {
      res.status(200).json({
        message: "Cart cleared for User ",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.Cart_deleteItem = (req, res, next) => {
  if (req.query.cartItemId) {
    queryFilter = { "products._id": req.query.cartItemId };
  } else {
    return res.status(400).json({
      error: "Query is empty",
    });
  }
  Cart.updateOne(queryFilter, {
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

exports.Cart_getCount = (req, res, next) => {
  if (req.query.userId) {
    queryFilter = { userId: mongoose.Types.ObjectId(req.query.userId) };
  } else {
    return res.status(500).json({
      error: "Query is empty",
    });
  }

  Cart.aggregate([
    { $unwind: "$products" },
    { $match: queryFilter },
    {
      $group: {
        _id: null,
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
