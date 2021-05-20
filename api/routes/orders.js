const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/orderController");
const checkAuth = require("../middleware/checkAuth");

//@desc get orders from DB
//@route = GET /api/orders
//@query = userId (General) or null (Admin Auth)
router.get("/", OrderController.Order_getOrders);

router.post("/",OrderController.Order_createOrder);

router.put("/", OrderController.Order_editOrder);



module.exports = router;