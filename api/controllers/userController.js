const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

exports.userLogin = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user === null) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (err) {
          return res.status(401).json({
            message: err.message,
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id,
              role : user.role
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth Successful",
            token: token,
          });
        }
        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.userSignUp = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        throw new Error("User Exists");
      } else {
        return bcrypt.hash(req.body.password, 10);
      }
    })
    .then((hash) => {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash,
        role: ['buyer'] 
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "User Created",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.deleteUser = (req, res, next) => {
  if (req.query.id) {
    query = { _id: req.query.id };
  } else {
    return res.status(500).json({
      error: "Query is empty",
    });
  }
  User.deleteOne(query)
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User Deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.signout = (req, res, next) => {
  try {
    let randomNumberToAppend = toString(Math.floor(Math.random() * 1000 + 1));
    let randomIndex = Math.floor(Math.random() * 10 + 1);
    let hashedRandomNumberToAppend = bcrypt.hash(randomNumberToAppend, 10);

    // now just concat the hashed random number to the end of the token
    const token =
      req.headers.authorization.split(" ")[1] + hashedRandomNumberToAppend;
    return res.status(200).json({
      message: "Logout Successfull",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.resetPassword = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      let randomNumberToAppend = toString(Math.floor(Math.random() * 1000 + 1));
      let randomIndex = Math.floor(Math.random() * 10 + 1);
      let hashedRandomNumberToAppend = bcrypt.hash(randomNumberToAppend, 10);

      // now just concat the hashed random number to the end of the token
      const password = hashedRandomNumberToAppend;

      return res.status(200).json({
        message: "New passWord",
        password: password,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
};


