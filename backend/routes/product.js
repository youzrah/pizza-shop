const express = require("express");
const router = express.Router();

const { getProducts, getSingleProduct, updateProduct, deleteProduct, newProduct } = require("../controllers/productController");

router.get('/product', getProducts)
router.get('/product/:id', getSingleProduct)
router.put('/product/update/:id', updateProduct)
router.delete('/product/delete/:id', deleteProduct)
router.post('/product/new', newProduct)

module.exports = router;