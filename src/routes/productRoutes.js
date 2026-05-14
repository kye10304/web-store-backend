const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController.js');

productRouter.get('/products', productController.products);

module.exports = {productRouter};
