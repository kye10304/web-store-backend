const orderService = require('../services/orderService')

exports.createOrder = async (req, res) => {
    const userId = req.user.id
    const items = req.body.items;

    const order = await orderService.createOrder(
        userId,
        items
    );
    res.status(201).json(order)
}

exports.updateOrderStatus = async (req, res) => {
    const orderId = req.params.id;


    const order = await orderService.updateOrder(
        orderId,
        req.body.status
    );

    if (!order) {
        return res.status(404).json({
            message: 'Order not found'
        });
    }

    res.status(200).json(order)
}

exports.orderPayment = async (req, res) => {
    const orderId = req.params.id;
    const userId = req.user.id;

    const payment = await orderService.orderPayment(
        orderId,
        userId,
    )
    res.status(201).json(payment)
}