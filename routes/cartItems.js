const express = require("express");
const app = express();
const router = express.Router();
var connection = require('./../database/serverConnector');

router.get('/:userId', (req, res, next) => {
  connection.query('SELECT * FROM cart_items AS c INNER JOIN product AS p ON c.product_id = p.id WHERE user_id = ?', [req.params.userId], function(error, results, fields) {
    if (error) throw error;
    else {
      console.log("Query made for cart of user " + req.params.userId);
      res.status(200).send(results);
    }
  });
});


router.post('/:userId', userValidate, (req, res, next) => {
 multipleProductValidation(req, res, next)
  .then(function(data) {
    res.status(201).json({
      message: "Added all products to the cart"
    });
  })
  .catch(error =>
    res.status(500).json({
      message: error
    })
  );
});


function userValidate(req, res, next) {
  connection.query('SELECT * from user where id = ?', [req.params.userId], function(error, user, fields) {
    if (error) {
      res.status(500).json({
        message: error.sqlMessage
      });

    } else {
      if (user.length == 0) {
        res.status(404).json({
          message: 'User not found with ID ' + req.params.userId
        });
      } else next();
    }
  })
}

function multipleProductValidation(req, res, next){
 return new Promise(function(resolve, reject) {
   let promiseArr = req.body.cartItems.map(item => productValidate(item, req, res, next))
   Promise.all(promiseArr).then(values => resolve(values)).catch(error =>reject(error))
 }
 )}


function productValidate(item, req, res, next) {
  return new Promise(function(resolve, reject) {
    connection.query('SELECT * from product where id = ?', [item.product_id], function(error, product, fields) {
      if (error) {
        reject(error.sqlMessage)
      } else {
        if (product.length == 0) {
            reject('Product not found with ID ' + item.product_id)
        } else {
          connection.query('INSERT INTO cart_items (product_id,user_id,size,quantity) VALUES (?,?,?,?)', [item.product_id, req.params.userId, item.size, item.quantity], function(error, results, fields) {
            if (error) {
              reject(error.sqlMessage)
            } else {
              resolve(true)
            }
          })
        };
      }
    })
  });
}

module.exports = router;
