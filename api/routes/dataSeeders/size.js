const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Size = require("../../models/size");
const checkAuth = require("../../middleware/checkAuth")

//@desc GET size from DB
//@route = GET /api/size
//@query = sizeId or name

router.get("/", (req, res, next) => {
  if (req.query.sizeId) {
    queryFilter = { _id: req.query.sizeId };
  } else {
    queryFilter = {};
  }
  Size.find(queryFilter)
    .exec()
    .then((docs) => {
      res.status(200).send(docs);
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
});

//@desc POST size to DB
//@route = POST /api/size

router.post("/",checkAuth, (req, res, next) => {
  const size = new Size({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
  });
  size.save().then((result) => {
    res.status(201).json({
      message: "Added Size to db successfully",
      createdSize: {
        name: result.name,
        _id: result._id,
        request: {
          type: "GET",
          url: "http://localhost:3000/size?sizeId=" + result._id,
        },
      },
    });
  });
  res.status(500).json({
    error: err.message,
  });
});

module.exports = router;
