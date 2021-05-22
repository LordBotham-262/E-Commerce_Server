const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/orderController");
const checkAuth = require("../middleware/checkAuth");
const checkRole = require("../middleware/checkRole");

//@desc get orders from DB
//@route = GET /api/orders
//@query = userId (General) or null (Admin Auth)
router.get("/", checkAuth, OrderController.Order_getOrders);

//@desc PUT order to DB
//@route = PUT /api/orders
//@query = userId (General)
router.post("/", checkAuth, OrderController.Order_createOrder);

//@desc EDIT orders in DB
//@route = PUT /api/orders
//@query = orderId (General)
router.put("/", checkAuth, checkRole, OrderController.Order_editOrder);

module.exports = router;
