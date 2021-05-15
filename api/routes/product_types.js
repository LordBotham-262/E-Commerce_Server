const express = require("express");
const router = express.Router();

const ProducTypeController = require("../controllers/productTypeController")

//@desc GET productType from DB
//@route = GET /api/product_type
router.get('/', ProducTypeController.productType_getAll);

//@desc POST productType to DB
//@route = POST /api/product_type
router.post('/', ProducTypeController.productType_postCategory);

module.exports = router;