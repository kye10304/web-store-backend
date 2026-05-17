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
    const orderStatus = req.body.status;

    if (orderStatus != 'In_Progress' || 'Cancelled') {
        throw new Error('Not allowed. Admin can chenge status only to "In_Progress" or "Cancelled"')
    }

    const order = await orderService.updateOrder(
        orderId,
        orderStatus
    );
    res.status(201).json(order)
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