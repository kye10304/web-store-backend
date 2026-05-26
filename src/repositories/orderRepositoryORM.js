const {Order, OrderItem} = require('../models');


exports.addTotalPrice = async (totalPrice, orderId) => {
    await Order.update({
        total_price: totalPrice
    }, {
        where: {id: orderId}
    })
   
    const updatedTotalPrice = await Order.findByPk(orderId, {
        attributes: ['id', 'total_price']
    })

    if (!updatedTotalPrice) return null
    return updatedTotalPrice.toJSON() 
}

exports.createOrder = async (userId) => {
    const order = await Order.create({
        user_id: userId,
    })
        
    return order.toJSON()
};

exports.createOrderItems = async ( 
    orderId,
    productId,
    quantity,
    price) => {
    const orderItems = await OrderItem.create({
        order_id: orderId, 
        product_id: productId, 
        quantity, 
        price
    })
    return orderItems.toJSON();    
    }

exports.findOrderById = async(orderId) => {
    const result = await Order.findByPk(orderId);
    if (!result) return null;
    return result.toJSON()
}

exports.updateStatus = async (orderId, orderStatus) => {
    await Order.update({
        status: orderStatus
        },
    {
        where: {id: orderId}
    })
    
    const newStatus = await Order.findByPk(orderId, {
        attributes: ['id', 'status']
    })

    if (!newStatus) return null
    return newStatus.toJSON()    
}