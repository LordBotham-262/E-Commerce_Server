const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const ProducTypeController = require("../controllers/productTypeController");

//@desc GET productType from DB
//@route = GET /api/product_type
//@query = categoryId or null
router.get("/", ProducTypeController.productType_getAll);

//@desc POST productType to DB
//@route = POST /api/product_type
router.post("/", checkAuth, ProducTypeController.productType_postCategory);

module.exports = router;
