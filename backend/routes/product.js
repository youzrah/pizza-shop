const express = require("express");
const router = express.Router();
const upload = require('../utils/multer')

const { getProducts, getSingleProduct, updateProduct, deleteProduct, newProduct } = require("../controllers/productController");

router.get('/products', getProducts)
router.get('/product/:id', getSingleProduct)
router.put('/product/update/:id', upload.array('images', 10), updateProduct)
router.delete('/product/delete/:id', deleteProduct)
router.post('/product/new', upload.array('images', 10), newProduct)

module.exports = router;