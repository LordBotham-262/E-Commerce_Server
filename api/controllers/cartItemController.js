const CartItem = require("../models/cartItem");
const Product = require("../models/product");
const mongoose = require("mongoose");

exports.cartItem_getAll =(req, res, next) => {
    if (req.query.cartId) {
      queryFilter = { _id: req.query.cartId };
    } else {
      queryFilter = { userId: req.query.userId };
    }
    CartItem.find(queryFilter)
      .exec()
      .then((docs) => {
        res.status(200).send(docs);
      })
      .catch((error) => {
        res.status(400).send(error.message);
      });
  };


  exports.cartItem_postOne = (req, res, next) => {
    Product.findById(req.body.productId)
      .then((product) => {
        if (!product) throw(new Error("Product not Found"))
        const cartItem = new CartItem({
          _id: new mongoose.Types.ObjectId(),
          productId: req.body.productId,
          quantity: req.body.quantity,
          size: req.body.size,
          color: req.body.color,
          userId: req.body.userId,
        });
        return cartItem.save();
      })
      .then((result) => {
        res.status(201).json({
          message: "Item added to cart successfully",
          createdProductType: {
            name: result.name,
            _id: result._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/cart?cartId=" + result._id,
            },
          },
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
    } else if(req.query.userId) {
      queryFilter = { userId: req.query.userId };
    }else{
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
      .catch((error) => {
        res.status(400).send(error.message);
      });
  }
