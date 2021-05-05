const express = require("express");
const app = express();
const router = express.Router();
var connection = require('./../database/serverConnector');

router.get('/:userId', (req, res, next) => {
  connection.query('SELECT * FROM cart_items AS c INNER JOIN product AS p ON c.product_id = p.id WHERE user_id = ?', [req.params.userId], function(error, results, fields) {
    if (error) res.status(500).send(error.sqlMessage);
    else {
      console.log("Query made for cart of user " + req.params.userId);
      res.status(200).send(results);
    }
  });
});

router.post('/:userId', userValidate, (req, res, next) => {
  multipleProductInCartValidation(req, res, next)
  .then(function(data) {
    console.log("reached here");
    connection.query('SELECT sum(quantity) as cartCount FROM cart_items where user_id = ?', [req.params.userId], function(error, results, fields) {
      if (error) res.status(500).send(error.sqlMessage);
      else {
        console.log(results);
        res.status(201).send(results);
      }
    });
  })
  .catch(error =>
    res.status(500).json({
      message: error
    })
  );
});

router.delete('/:userId/cart_id/:cartId',userValidate, (req,res,next) => {
  connection.query('delete from cart_items where user_id = ?  and (cart_id = ? or ?  = 0)', [req.params.userId,req.params.cartId, req.params.cartId], function(error, results, fields) {
    if (error) res.status(500).send(error.sqlMessage);
    else {
      console.log("Item " + req.params.cartId +" deleted from cart for User" + req.params.userId);
      connection.query('SELECT sum(quantity) as cartCount FROM cart_items where user_id = ?', [req.params.userId], function(error, results, fields) {
        if (error) res.status(500).send(error.sqlMessage);
        else {
          console.log(results);
          res.status(200).send(results);
        }
      });
    }
  });
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

function multipleProductInCartValidation(req, res, next){
 return new Promise(function(resolve, reject) {
   let promiseArr = req.body.cartItems.map(item => productInCartValidate(item, req, res, next))
   Promise.all(promiseArr).then(values => resolve(values)).catch(error =>reject(error))
 }
 )}

function productInCartValidate(item, req, res, next) {
  return new Promise(function(resolve, reject) {
    connection.query('SELECT * FROM cart_items where user_id = ? and product_id = ? and size = ?', [req.params.userId,item.product_id, item.size], function(error, product, fields) {
      console.log("cart item checking");
      if (error) {
        reject(error.sqlMessage)
      } else {
        if (product.length == 0) {
          console.log("not found in cart");
          cartItemInsertion(item, req, res, next).then(values => resolve(values)).catch(error =>reject(error))
        } else {
          console.log("cart item already in cart.Updating");
          cartItemUpdation(item, req, res, next).then(values => resolve(values)).catch(error =>reject(error))
        };
      }
    })
  });
}

function cartItemUpdation(item, req, res, next) {
  return new Promise(function(resolve, reject) {
    connection.query('update cart_items SET size = ? , quantity = ? where user_id = ? and product_id = ?', [item.size, item.quantity,req.params.userId,item.product_id], function(error, results, fields) {
        if (error) reject(error)
      else 
      console.log("cart item updated");
      resolve(true)
      })
    });
  }

function cartItemInsertion(item, req, res, next) {
  return new Promise(function(resolve, reject) {
    connection.query('INSERT INTO cart_items (product_id,user_id,size,quantity) VALUES (?,?,?,?)', [item.product_id, req.params.userId, item.size, item.quantity], function(error, results, fields) {
      if (error) 
        reject(error.sqlMessage)
       else {
        console.log("cart item inserted");
        resolve(true)
      }
    })
    });
  }

module.exports = router;
