const {Order, OrderItem} = require('../models');


exports.addTotalPrice = async (totalPrice, orderId, options = {}) => {
    await Order.update({
        total_price: totalPrice
    }, {
        where: {id: orderId},
        transaction: options.transaction      
    })
   
    const updatedTotalPrice = await Order.findByPk(orderId, {
        attributes: ['id', 'total_price'],
        transaction: options.transaction
    })

    if (!updatedTotalPrice) return null
    return updatedTotalPrice.toJSON() 
}

exports.createOrder = async (userId, options = {}) => {
    const order = await Order.create({
        user_id: userId,
    }, {
        transaction: options.transaction
    })
        
    return order.toJSON()
};

exports.createOrderItems = async ( 
    orderId,
    productId,
    quantity,
    price,
    options = {}
) => {
    const orderItems = await OrderItem.create({
        order_id: orderId, 
        product_id: productId, 
        quantity, 
        price
    }, {
        transaction: options.transaction
    })
    return orderItems.toJSON();    
    }

exports.findOrderById = async(orderId) => {
    const result = await Order.findByPk(orderId);
    if (!result) return null;
    return result.toJSON()
}

exports.updateStatus = async (orderId, orderStatus, options = {}) => {
    
    const order = await Order.findByPk(orderId, {
        attributes: ['id', 'status'],
        ...options
    })

    if (!order) return null

    if (orderStatus === 'Executed' && order.status !== 'Paid') {
        throw new Error('Cannot change status to "Executed", if order has not been "Paid"')
    }
    
    await Order.update({
        status: orderStatus
        },
    {
        where: {id: orderId},
        ...options
    })
    
    const newStatus = await Order.findByPk(orderId, {
        attributes: ['id', 'status'],
        ...options
    })

    if (!newStatus) return null
    return newStatus.toJSON()    
}