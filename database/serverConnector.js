require('dotenv').config();

var mysql = require('mysql');
var pool  = mysql.createPool({
  host: process.env.host ,
  port: process.env.port,
  user: process.env.user,
  password: process.env.password,
  database: process.env.databse
});


// databaseConnection().then(values => console.log(values)).catch(error => console.log(error));
//
// function databaseConnection() {
//   return new Promise(function(resolve, reject) {
//     connection.connect(function(err) {
//       if (err) {
//         reject(err)
//       }
//       resolve('Connected to the MySQL server.');
//     });
//   });
// }

module.exports = pool;
