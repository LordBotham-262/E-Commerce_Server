//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

var connection = require('./database/serverConnector');

const productRoutes = require('./routes/products');
const productTypesRoutes = require('./routes/product_types');
const cartItemsRoutes = require('./routes/cartItems');

app.use('/products',productRoutes);
app.use('/product_type',productTypesRoutes);
app.use('/cart/user_id',cartItemsRoutes);

app.use((req,res,next) => {
  const error = new Error('Not Found');
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

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

//connection.end();
