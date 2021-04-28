var mysql = require('mysql');
var connection  = mysql.createConnection({
  host: 'remotemysql.com',
  port: '3306',
<<<<<<< HEAD
  user: process.env.user || 'root',
  password: process.env.password || 'root',
  database: process.env.databse || 'patel_'
=======
  user: 'n8IMpYi7Lk',
  password: 'O63VhjHyfC',
  database: 'n8IMpYi7Lk'
>>>>>>> e9eab3eab4ed1cf22b0836b82a3239076a999917
});

//connection.connect();

databaseConnection().then(values => console.log(values)).catch(error => console.log(error));

function databaseConnection() {
  return new Promise(function(resolve, reject) {
    connection.connect(function(err) {
      if (err) {
        reject(err)
      }
      resolve('Connected to the MySQL server.');
    });
  });
}

module.exports = connection;
