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
  var query_newData = {
    _id: req.query.productId,
    variations: {
      $not: {
        $elemMatch: {
          size: data.size,
          color: data.color,
        },
      },
    },
  };
  var update_newData = { $addToSet: { variations: data } };
  var query = {
    _id: req.query.productId,
    "variations.size": data.size,
    "variations.color": data.color,
  };
  var update = { $set: { "variations.$": data } };

  Product.updateOne(query_newData, update_newData, { new: true })
    .then((result) => {
      if (result.nModified === 0) {
        return Product.updateOne(query, update, { new: true });
      } else return result;
    })
    .then((docs) => {
      res.status(201).json({
        message: "Variation added to Product Data",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

exports.products_deleteVariation = (req,res,next) => {
  if(req.query.variationId) {
    query = {'variations._id' : req.query.variationId}
  } else {
    return res.status(500).json({
      error: "Query is empty",
    });
  }
  Product.updateOne(query,{$pull : {variations : {_id : req.query.variationId}}})
  .then((docs) => {
    res.status(201).json({
      message: "Variation removed from Product",
    });
  })
  .catch((err) => {
    res.status(500).json({
      message: err.message,
    });
  });
}; 

exports.products_deleteProduct = (req,res,next) => {
  Product.remove({_id : requestAnimationFrame.query.productId})
  .then((docs) => {
    res.status(201).json({
      message: "Variation removed from Product",
    });
  })
  .catch((err) => {
    res.status(500).json({
      message: err.message,
    });
  });
};