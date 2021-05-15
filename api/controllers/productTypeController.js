const mongoose = require('mongoose');
const ProductType = require("../models/productType");

exports.productType_postCategory= (req, res, next) => {
    const productType = new ProductType({
      _id : new mongoose.Types.ObjectId(),
      name : req.body.name,
    });
    productType
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created product type successfully",
        createdProductType: {
            name: result.name,
            _id: result._id,
            request: {
                type: 'GET',
                url: "http://localhost:3000/product_type?catId=" + result._id
            }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err.message,
      });
    });
  }


  exports.productType_getAll = (req, res, next) => {
    if(req.query.catId){queryFilter = {_id : req.query.catId}} else {queryFilter={}}
    ProductType.find(queryFilter)
      .exec()
      .then(docs => {
          res.status(200).send(docs);
      })
      .catch(error =>{
          res.status(400).send(error.message,);
      })
  }