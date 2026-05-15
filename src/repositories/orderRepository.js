const pool = require('../../db.js');

exports.addTotalPrice = async (totalPrice, orderId) => {
    const result = await pool.query(
        `UPDATE orders SET total_price =$1 WHERE id = $2 RETURNING total_price `, [
            totalPrice,
            orderId
        ]
    )
    return result.rows[0];
}

exports.createOrder = async (userId) => {
    const order = await pool.query(
    `INSERT INTO orders (user_id, status, total_price) VALUES ($1, 'Created', 0) RETURNING *;`, [userId]);
    return order.rows[0];
};

exports.createOrderItems = async ( 
    orderId,
    productId,
    quantity,
    price) => {
    const orderItems = await pool.query(
        `INSERT INTO order_items ( order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *;`, [
            orderId,
            productId,
            quantity,
            price
          ]);
          return orderItems.rows[0];    
    }

