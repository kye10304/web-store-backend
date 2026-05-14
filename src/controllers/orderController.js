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