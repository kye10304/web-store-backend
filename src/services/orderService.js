const orderRepository = require('../repositories/orderRepositoryORM');
const productRepository = require('../repositories/productRepositoryORM');
const userRepository = require('../repositories/userRepositoryORM');
const {sequelize} = require('../models');

/*
 * Create order
 *
 * @param {number} userId
 * @param {Array<{productId: number, quantity: number}>} items
 */

exports.createOrder = async (userId, items) => {

  const transaction = await sequelize.transaction();

  try {
  const order = await orderRepository.createOrder(userId, {transaction});
  let totalPrice = 0;
  for (let item of items) {
    const product = await productRepository.productById(item.productId, {transaction});

    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }
    totalPrice += product.price*item.quantity;
    await orderRepository.createOrderItems(
      order.id,
      item.productId,
      item.quantity,
      product.price,
      {transaction}
    );
  }

  await orderRepository.addTotalPrice(totalPrice, order.id, {transaction});

  await transaction.commit()

  return {
    ...order,
    total_price: totalPrice
  };
} catch (err) {
    await transaction.rollback();
    throw err
} 
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
    throw new Error('Insufficient funds in the account!');
  } 

  const updateOrderStatus = await orderRepository.updateStatus(orderId, 'Paid');
  const newBalance = balance - orderPrice;
  const updateUserBalance = await userRepository.updateBalance(userId, -orderPrice);
  return { updateOrderStatus, updateUserBalance, newBalance };
}