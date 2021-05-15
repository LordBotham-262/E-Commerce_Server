//jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
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


const productRoutes = require('./api/routes/products');
const productTypesRoutes = require('./api/routes/product_types');
const cartItemsRoutes = require('./api/routes/cartItems');
const colorRoutes = require('./api/routes/dataSeeders/colors');
const sizeRoutes = require('./api/routes/dataSeeders/size');
const userRoutes = require('./api/routes/users')

app.get('/',(req, res, next) => {
  res.send("Hello world");
});

app.use('/products',productRoutes);
app.use('/product_type',productTypesRoutes);
app.use('/cart',cartItemsRoutes);
app.use('/color',colorRoutes);
app.use('/size',sizeRoutes);
app.use('/user',userRoutes);

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
