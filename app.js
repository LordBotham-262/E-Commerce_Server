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
connection.query('select * from posts', function (error, results, fields) {
  if (error) throw error;
  posts = results;
});

app.route('/products_type')
  .get(function(req,res){
    connection.query('select * from products_type' ,function (error, results, fields) {
       if (error) throw error;
       else {
         res.send(results);
       }
     });
  })
  ;

  app.route('/product')
  .get(function(req,res){
    connection.query('select * from product' ,function (error, results, fields) {
       if (error) throw error;
       else {
         res.send(results);
       }
     });
  })
;


app.route('/product/:id')
  .get(function(req,res){
    connection.query('select * from product where id = ?',[req.params.id],function (error, results, fields) {
       if (error) throw error;
       else {
         res.send(results);
       }
     });
  });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

//connection.end();
