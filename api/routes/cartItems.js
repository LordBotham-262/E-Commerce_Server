const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const CartItemController = require("../controllers/cartItemController");

//@desc GET cart Items from DB
//@route = GET /api/cart
//@query = userId or cartId
router.get("/", checkAuth, CartItemController.cartItem_getAll);

//@desc POST cartItem to DB
//@route = POST /api/cart
router.post("/", checkAuth, CartItemController.cartItem_postOne);

//@desc DELETE cartItem from DB
//@route = DELETE api/cart
//query = userID or cartID
router.delete("/", checkAuth, CartItemController.cartitem_delete);

//@desc GET cartCount from DB
//@route = GET api/cart
//query = userID
router.get("/getCount",CartItemController.cartitem_getCount);

module.exports = router;
