const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Color = require("../../models/color");
const checkAuth = require("../../middleware/checkAuth");

//@desc GET Colors from DB
//@route = GET /api/color
//@query = colorId or name

router.get("/", (req, res, next) => {
  if (req.query.colorId) {
    queryFilter = { _id: req.query.colorId };
  } else {
    queryFilter = {};
  }
  Color.find(queryFilter)
    .exec()
    .then((docs) => {
      res.status(200).send(docs);
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
});

//@desc POST Colors to DB
//@route = POST /api/color

router.post("/", checkAuth, (req, res, next) => {
  const color = new Color({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    value: req.body.value,
  });
  color
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Added Color to db successfully",
        createdColor: {
          _id: result._id,
          name: result.name,
          value: result.value,
          request: {
            type: "GET",
            url: "http://localhost:3000/color?colorId=" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

module.exports = router;
