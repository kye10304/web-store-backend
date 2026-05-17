const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const orderController = require('../controllers/orderController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const orderRouter = express.Router();

orderRouter.post('/checkout', authMiddleware, orderController.createOrder);
orderRouter.patch('/updateOrder/:id/status', authMiddleware, roleMiddleware('admin'), orderController.updateOrderStatus)
orderRouter.patch('/orderPayment/:id', authMiddleware, roleMiddleware('user'), orderController.orderPayment)

module.exports = { orderRouter };
