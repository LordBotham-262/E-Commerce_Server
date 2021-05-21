const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const CartItemController = require("../controllers/cartItemController");

//@desc GET cart Items from DB
//@route = GET /api/cart
//@query = userId or cartId
router.get("/", CartItemController.cartItem_getAll);

//@desc PUT cartItem to db
//@route = PUT /api/cart
//query = userId
router.put("/", CartItemController.cartItem_putOne);

//@desc DELETE cartItem from DB
//@route = DELETE api/cart
//query = cartID
router.delete("/cartItem",  CartItemController.cartitem_delete);

//@desc GET cartCount from DB
//@route = GET api/cart
//query = userID
router.get("/getCount",CartItemController.cartitem_getCount);

//@desc POST empty cart to db
//@route = POST /api/cart
//query = userId
router.post("/", CartItemController.cartItem_createCart);

//@desc DELETE cartitems from db
//@route = DELETE /api/cart
//query = userId
router.delete("/", CartItemController.cartItem_clearCart);

module.exports = router;
