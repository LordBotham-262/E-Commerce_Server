var mysql = require('mysql');
var connection  = mysql.createConnection({
  host: 'remotemysql.com',
  port: '3306',
  user: 'n8IMpYi7Lk',
  password: 'O63VhjHyfC',
  database: 'n8IMpYi7Lk'
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
