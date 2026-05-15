const orderRepository = require('../repositories/orderRepository');
const productRepository = require('../repositories/productRepository');

//Надо написать transaction

exports.createOrder = async (userId, items) => {
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

