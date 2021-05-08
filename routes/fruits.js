const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Fruit = require("../models/fruit");

router.get('/',(req,res,next) =>{
    Fruit.find()
    .exec()
    .then(docs => {
        console.log(docs)
        res.status(200).send(docs);
    })
    .catch(error =>{
        console.log(error);
        res.status(400).send(error);
    })
});

module.exports = router;