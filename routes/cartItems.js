const express = require("express");
const app = express();
const router = express.Router();
var connection = require('./../database/serverConnector');
var Q = require("q");

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
let xyz;
  req.body.cartItems.forEach((item, i) => {
    xyz = productValidate(item, req, res, next)
    .then(console.log(xyz));
  });

  // if (xyz) {
  //   res.status(201).json({
  //     message: 'Items added to cart for User ' + req.params.userId
  //   });
  // }

  // res.status(201).json({
  //   message: 'Items added to cart for User ' + req.params.userId
  // });
  // try {
  //   connection.query('SELECT * from user where id = ?', [req.params.userId], function(error, user, fields) {
  //     if (error) {
  //       throw error;
  //     } else {
  //       if (user.length == 0) {
  //         res.status(404).json({
  //           message: 'user not found for ID ' + req.params.userId
  //         });
  //       } else {
  //         req.body.cartItems.forEach((item, i) => {
  //           connection.query('SELECT * from product where id = ?', [item.product_id], function(error, product, fields) {
  //             if (error) {
  //               res.status(404).json({
  //                 message: 'SQL Error ' + error.sqlMessage
  //               });
  //             } else {
  //               if (product.length == 0) {
  //                 res.status(404).json({
  //                   message: 'Product not found for ID ' + item.product_id
  //                 });
  //               } else {
  //                 connection.query('INSERT INTO cart_items (product_id,user_id,size,quantity) VALUES (?,?,?,?)', [item.product_id, req.params.userId, item.size, item.quantity], function(error, results, fields) {
  //                   if (error)
  //                     throw error;
  //                   else {
  //                     console.log("Items inserted successfully");
  //                   }
  //                 })
  //               }
  //             }
  //           })
  //         })
  //         res.status(201).json({
  //           message: 'Items added to cart for User ' + req.params.userId
  //         });
  //       }
  //     }
  //   })
  // } catch (e) {
  //   console.log(e);
  //   next();
  // }

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

async function productValidate(item, req, res, next) {
  let productValidation;
  connection.query('SELECT * from product where id = ?', [item.product_id], function(error, product, fields) {
    if (error) {
      res.status(500).json({
        message: error.sqlMessage
      });
    } else {
      if (product.length == 0) {
        res.status(404).json({
          message: 'Product not found with ID ' + item.product_id
        });
        productValidation = false;
      } else {
        connection.query('INSERT INTO cart_items (product_id,user_id,size,quantity) VALUES (?,?,?,?)', [item.product_id, req.params.userId, item.size, item.quantity], function(error, results, fields) {
          if (error) {
            res.status(500).json({
              message: error.sqlMessage
            });
          } else {
            console.log("Items inserted successfully");
            productValidation =  true;
          }
        })
      };
    }
  })
  return productValidation;
}


module.exports = router;
