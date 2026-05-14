const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const orderController = require('../controllers/orderController');
const orderRouter = express.Router();

orderRouter.post('/checkout', authMiddleware, orderController.createOrder);

module.exports = { orderRouter };
