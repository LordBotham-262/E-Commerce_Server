const mongoose = require("mongoose");

const Product = require("../models/product");

exports.products_getAll = (req, res, next) => {
    productId = req.query.productId
    catId = req.query.categoryId
  
  if(productId){queryFilter = {_id : productId}} else if (catId){queryFilter = {catId: catId }} else queryFilter = {};
  
    Product.find(queryFilter)
      .exec()
      .then(docs => {
          res.status(200).send(docs);
      })
      .catch(error =>{
          res.status(400).send(error.message,);
      })
  }