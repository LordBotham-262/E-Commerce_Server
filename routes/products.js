const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");

//@desc get products from DB
//@route = GET /api/products
//@query = categoryId or productId or null

router.get('/', (req, res, next) => {
  productId = req.query.productId
  catId = req.query.categoryId

if(productId){queryFilter = {_id : productId}} else if (catId){queryFilter = {catId: catId }} else queryFilter = {};

  Product.find(queryFilter)
    .exec()
    .then(docs => {
        res.status(200).send(docs);
    })
    .catch(error =>{
        console.log(error);
        res.status(400).send(error);
    })
});

module.exports = router;



