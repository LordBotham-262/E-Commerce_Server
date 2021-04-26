const express = require("express");
const router = express.Router();
var connection = require('./../database/serverConnector');

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET Requests'
  });
});

router.get('/:userId', (req, res, next) => {
    connection.query('SELECT * FROM cart_items AS c INNER JOIN product AS p ON c.product_id = p.id WHERE user_id = ?', [req.params.userId], function(error, results, fields) {
      if (error) throw error;
      else {
        console.log("Query made for cart of user " + req.params.userId);
        res.send(results);
      }
    });
  });


  router.post('/:userId', (req, res, next) => {
      try {
        connection.query('SELECT * from user where id = ?', [req.params.userId], function(error, user, fields) {
            if (error)
              throw error
            else {
              if (user.length == 0) {
                throw "user not found";
              }}})}
               catch (e) {
                 console.log(e);
                req.body.cartItems.forEach((item, i) => {
                    connection.query('SELECT * from product where id = ?', [item.product_id], function(error, product, fields) {
                        if (error)
                          throw error
                        else {
                          if (product.length == 0) {
                            throw "Product not found";
                            connection.query('INSERT INTO cart_items (product_id,user_id,size,quantity) VALUES (?,?,?,?)', [item.product_id, req.params.userId, item.size, item.quantity], function(error, results, fields) {
                                if (error)
                                  throw error;
                                else {
                                  throw "Items inserted successfully";
                              }
                            })
                        }
                      }})})

    }
  })


module.exports = router;
