const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const CartController = require("../controllers/cartController");

//@desc GET cart from DB
//@route = GET /api/cart
//@query = userId or cartId
router.get("/", CartController.Cart_getCart);

//@desc GET cartCount from DB
//@route = GET api/cart
//query = userID or cartId
router.get("/getCount",CartController.Cart_getCount);

//@desc POST Cart to db
//@route = POST /api/cart
//query = userId
router.post("/", CartController.Cart_createCart);

//@desc DELETE cart from db
//@route = DELETE /api/cart
//query = userId or cartId
router.delete("/", CartController.Cart_deleteCart);

//@desc DELETE Cart from DB
//@route = DELETE api/cartItem
//query = CartItemID
router.delete("/cartItem",  CartController.Cart_deleteItem);


module.exports = router;
