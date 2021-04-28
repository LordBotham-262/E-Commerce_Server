var mysql = require('mysql');
var connection  = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: process.env.user || 'root',
  password: process.env.password || 'root',
  database: process.env.databse || 'patel_'
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
