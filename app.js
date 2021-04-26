//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'root',
  database : 'patel_'
});

connection.connect();

app.route('/product_type')
  .get(function(req,res){
    connection.query('select * from products_type' ,function (error, results, fields) {
       if (error) throw error;
       else {
         console.log("Query made for product types" );
         res.send(results);
       }
     });
  })
  ;

app.route('/product/category_id/:categoryId/product_id/:productId')
  .get(function(req,res){
    connection.query('select * from product where (id = ? or ? = 0) and (category = ? or ?  = 0 )',[req.params.productId,req.params.productId,req.params.categoryId,req.params.categoryId],function (error, results, fields) {
       if (error) throw error;
       else {
         console.log("Query made for category type " + req.params.categoryId + " & product_type " + req.params.productId );
         res.send(results);
       }
     });
  });

  app.route('/cart/user_id/:userId')
    .get(function(req,res){
      connection.query('SELECT * FROM cart_items AS c INNER JOIN product AS p ON c.product_id = p.id WHERE user_id = ?',[req.params.userId],function (error, results, fields) {
         if (error) throw error;
         else {
           console.log("Query made for cart of user " + req.params.userId);
           res.send(results);
         }
       });
    });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

//connection.end();
