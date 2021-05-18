const { json } = require("body-parser");
const mongoose = require("mongoose");

const Product = require("../models/product");

exports.products_getAll = (req, res, next) => {
  productId = req.query.productId;
  catId = req.query.categoryId;

  if (productId) {
    queryFilter = { _id: productId };
  } else if (catId) {
    queryFilter = { catId: catId };
  } else queryFilter = {};

  Product.find(queryFilter)
    .exec()
    .then((docs) => {
      res.status(200).send(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.products_addProduct = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.desc,
    imagePath: req.body.imagePath,
    catId: req.body.catId,
  });
  product
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

exports.products_addVariation = (req, res, next) => {
  const data = req.body;
  try {
    data.forEach((product) => {
      Product.findOneAndUpdate(
        {
          _id: req.query.productId
        },
        { $push: { variations : product }},
        { 
          arrayFilters: [{variations : {$elemMatch : { "color" : product.color , "size " : product.size}}}],
          new: true
        }
        //{'new': true, 'safe': true, 'upsert': true }
      )
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
    });
  } catch {
    (err) => {
      res.status(500).json({
        message: err.message,
      });
    };
  }
};

// Product.updateOne(
//   { _id: req.query.productId },
//   )
//   .then((docs) => {
//     res.status(201).json({
//       message: docs,
//     });
//   })
//   .catch((err) => {
//     res.status(500).json({
//       message: err.message,
//     });
//   });

// variations: [
//   {
//     size: ,
//     color: ,
//     stock: ,
//     price: ,
//     imageId: ,
//   },
// ],
