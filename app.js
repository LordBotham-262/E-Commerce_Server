//jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var _ = require('lodash');
const connectDB = require('./config/db')


connectDB();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());


const productRoutes = require('./routes/products');
const productTypesRoutes = require('./routes/product_types');
const cartItemsRoutes = require('./routes/cartItems');

app.get('/',(req, res, next) => {
  res.send("Hello world");
});

app.use('/products',productRoutes);
app.use('/product_type',productTypesRoutes);
app.use('/cart/user_id',cartItemsRoutes);

app.use((req,res,next) => {
  const error = new Error('404 Not Found');
  error.status = 404 ;
  next(error);
})

app.use((error,req,res,next) =>{
  res.status(error.status || 500);
  res.json({
    error : {
      message : error.message
    }
  });
});

module.exports = app;
