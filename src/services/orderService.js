const orderRepository = require('../repositories/orderRepository');
const productRepository = require('../repositories/productRepository');
const userRepository = require('../repositories/userRepository');

//Надо написать transaction

exports.createOrder = async (userId, items) => {

  const client = await pool.query('BEGIN');

  const order = await orderRepository.createOrder(userId);
  let totalPrice = 0;
  for (let item of items) {
    const product = await productRepository.productById(item.productId);

    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }
    totalPrice += product.price*item.quantity;
    await orderRepository.createOrderItems(
      order.id,
      item.productId,
      item.quantity,
      product.price
    )
    await orderRepository.addTotalPrice(totalPrice, order.id);
  }
  return {
    ...order,
    total_price: totalPrice
  };
};

exports.updateOrder = async (orderId, orderStatus) => {
  const order = await orderRepository.findOrderById(orderId);

  if (!order) {
    throw new Error('Order not found');
  }
  const updatedOrder = await orderRepository.updateStatus(orderId, orderStatus);
  
  return updatedOrder
}

exports.orderPayment = async (orderId, userId) => {
  const order = await orderRepository.findOrderById(orderId);
  const orderPrice = order.total_price;
  const balance = await userRepository.userBalanceById(userId);
  if (orderPrice > balance) {
    throw new Error('НЕДОСТАТНЬО КОШТІВ НА РАХУНКУ, ДРУЖЕ!');
  } 

  const updateOrderStatus = await orderRepository.updateStatus(orderId, 'Paid');
  const newBalance = balance - orderPrice;
  const updateUserBalance = await userRepository.updateBalance(userId, -orderPrice);
  return { updateOrderStatus, updateUserBalance, newBalance };
}