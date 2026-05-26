const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const orderController = require('../controllers/orderController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const schema = require('../vaildators/orderValidator')
const validator = require('../middlewares/validMiddleware')
const orderRouter = express.Router();

orderRouter.post('/checkout', authMiddleware, validator(schema.createOrderSchema), orderController.createOrder);
orderRouter.patch('/updateOrder/:id/status', authMiddleware, roleMiddleware('admin'), validator(schema.orderIdSchema, 'params'), validator(schema.updateOrderStatusSchema, 'body'), orderController.updateOrderStatus)
orderRouter.patch('/orderPayment/:id', authMiddleware, roleMiddleware('user'), validator(schema.orderPaymentSchema), orderController.orderPayment)

module.exports = { orderRouter };
