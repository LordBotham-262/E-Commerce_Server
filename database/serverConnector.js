require('dotenv').config();

var mysql = require('mysql');
var pool  = mysql.createPool({
  host: process.env.host ,
  port: process.env.port,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

module.exports = pool;
