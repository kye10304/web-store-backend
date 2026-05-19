const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController.js');

productRouter.get('/', productController.products);
productRouter.get('/:category', productController.productsByCategory);

module.exports = {productRouter};
