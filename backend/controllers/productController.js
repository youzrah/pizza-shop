const Product = require('../models/product')
const cloudinary = require('cloudinary')

exports.getProducts = async (req,res,next) => {
	
	// const resPerPage = 4;
	// const productsCount = await Product.countDocuments();
	// const apiFeatures = new APIFeatures(Product.find(),req.query).search().filter();

	const products = await Product.find();
	// apiFeatures.pagination(resPerPage);
	// const products = await apiFeatures.query;
	let filteredProductsCount = products.length;
	res.status(200).json({
		success: true,
		// filteredProductsCount,
		productsCount,
		products,
		// resPerPage,
	})
}