const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const orderController = require('../controllers/orderController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const schema = require('../vaildators/orderValidator')
const validator = require('../middlewares/validMiddleware')
const orderRouter = express.Router();

/**
 * @swagger
 * /order/checkout:
 *   post:
 *     summary: Create order (checkout)
 *     tags: [Order]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 4
 *
 *     responses:
 *       201:
 *         description: Order created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
orderRouter.post(
    '/checkout', 
    authMiddleware,
    roleMiddleware('user'),
    validator(schema.createOrderSchema), 
    orderController.createOrder
);

/**
 * @swagger
 * /order/updateOrder/{id}/status:
 *   patch:
 *     summary: Update order status (admin only)
 *     tags: [Order]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: In_Progress
 *
 *     responses:
 *       200:
 *         description: Order status updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 */
orderRouter.patch(
    '/updateOrder/:id/status', 
    authMiddleware, 
    roleMiddleware('admin'), 
    validator(schema.orderIdSchema, 'params'), 
    validator(schema.updateOrderStatusSchema, 'body'), 
    orderController.updateOrderStatus
)

/**
 * @swagger
 * /order/orderPayment/{id}:
 *   patch:
 *     summary: Order payment (by User)
 *     tags: [Order]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: Order has been paid
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not user)
 */
orderRouter.patch(
    '/orderPayment/:id', 
    authMiddleware, 
    roleMiddleware('user'),
    validator(schema.orderPaymentSchema, 'params'), 
    orderController.orderPayment
)

module.exports = orderRouter;
