const express = require("express");
const router = express.Router();

const CartItemController = require("../controllers/cartItemController")

//@desc GET cart Items from DB
//@route = GET /api/cart
//@query = userId or cartId
router.get("/", CartItemController.cartItem_getAll);

//@desc POST cartItem to DB
//@route = POST /api/cart
router.post("/", CartItemController.cartItem_postOne);

//@desc DELETE cartItem from DB
//@route = DELETE api/cart
//query = userID or cartID
router.delete("/", CartItemController.cartitem_delete);

module.exports = router;