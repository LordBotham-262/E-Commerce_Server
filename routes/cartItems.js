const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const CartItem = require("../models/cartItem");
const Product = require("../models/product");

//@desc GET cart Items from DB
//@route = GET /api/cart
//@query = userId or cartId

router.get("/", (req, res, next) => {
  if (req.query.cartId) {
    queryFilter = { _id: req.query.cartId };
  } else {
    queryFilter = { user: req.query.userId };
  }
  CartItem.find(queryFilter)
    .exec()
    .then((docs) => {
      res.status(200).send(docs);
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
});

//@desc POST cartItem to DB
//@route = POST /api/cart

router.post("/", (req, res, next) => {
  Product.findById(req.body.product)
    .then((product) => {
      console.log(product)
      if (!product) throw(new Error("Product not Found"))
      const cartItem = new CartItem({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.product,
        quantity: req.body.quantity,
        size: req.body.sizeas,
        color: req.body.color,
        user: req.body.userId,
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
      //console.log(err);
      res.status(500).json({
        error: err.message,
      });
    });
});

module.exports = router;
