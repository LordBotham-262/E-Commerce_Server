const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/productController");

//@desc get products from DB
//@route = GET /api/products
//@query = categoryId or productId or null

router.get("/", ProductController.products_getAll);

module.exports = router;
