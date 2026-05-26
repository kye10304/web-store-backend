const Joi = require('joi');


//orderRouter.post('/checkout', authMiddleware, orderController.createOrder);
exports.createOrderSchema = Joi.object({
    items: Joi.array().items(
        Joi.object({
            productId: Joi.number().integer().positive().required(),
            quantity: Joi.number().integer().positive().required(),
        })
    ),
});

//orderRouter.patch('/updateOrder/:id/status', authMiddleware, roleMiddleware('admin'), orderController.updateOrderStatus)

exports.orderIdSchema = Joi.object({
    id: Joi.number()
    .integer()
    .positive()
    .required()
});

exports.updateOrderStatusSchema = Joi.object({
    status: Joi.string()
    .valid('In_Progress', 'Cancelled')
    .required()
});

//orderRouter.patch('/orderPayment/:id', authMiddleware, roleMiddleware('user'), orderController.orderPayment)
exports.orderPaymentSchema = Joi.object({
    orderId: Joi.number().integer().positive().required()
})