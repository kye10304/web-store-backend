const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController.js');

productRouter.get('/products', productController.products);
productRouter.get('/products/:category', productController.productsByCategory);

module.exports = {productRouter};
