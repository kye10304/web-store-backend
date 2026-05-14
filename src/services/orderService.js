const orderRepository = require('../repositories/orderRepository');

exports.createOrder = async (userId) => {

  const order = await orderRepository.createOrder(userId);

  return order;
};