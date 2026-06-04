const orderService = require('../services/orderService')

exports.createOrder = async (req, res) => {
    try {
        const userId = req.user.id
        const items = req.body.items;

        const order = await orderService.createOrder(
            userId,
            items
        );
        res.status(201).json(order)
    } catch (err) {
        const statusCode = err.statusCode || 500;
        
        return res.status(statusCode).json({
            message: err.message
        });
    }
}

exports.updateOrderStatus = async (req, res) => {
    try {
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
    } catch (err) {
        let statusCode = err.statusCode || 500;
        
        if (err.message) {
            statusCode = 400;
        }

        return res.status(statusCode).json({
            message: err.message || 'Internal Server Error'
        })
    }
}

exports.orderPayment = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.user.id;
    
        const payment = await orderService.orderPayment(
            orderId,
            userId,
        )
        res.status(200).json(payment)
    } catch (err) {
        let statusCode = err.statusCode || 500;

        if (err.message) {
            statusCode = 400
        }

        return res.status(statusCode).json({
            message: err.message
        })
    }
}