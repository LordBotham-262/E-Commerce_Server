const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/productController");
const checkAuth = require("../middleware/checkAuth");

//@desc get products from DB
//@route = GET /api/products
//@query = categoryId or productId or null
router.get("/", ProductController.products_getAll);

//@desc POST product to DB
//@route = POST /api/products
router.post("/",checkAuth, ProductController.products_addProduct);

//@desc DELETE product from DB
//@route = DELETE /api/products
//@query = productId
router.delete("/",checkAuth, ProductController.products_deleteProduct);

//@desc PUT ie add variants to product 
//@route = PUT /api/products/variation
//@query = productId
router.put("/variation",checkAuth, ProductController.products_addVariation);

//@desc delete variation from a product
//@route = DELETE /api/products/variation
//@query = variationId
router.delete("/variation",checkAuth, ProductController.products_deleteVariation);

module.exports = router;
