const pool = require('../../db.js');

exports.createOrder = async (userId) => {
    const order = await pool.query(
    `INSERT INTO orders (user_id, status, total_price) VALUES ($1, 'Created', 0) RETURNING *;`, [userId]);
    return order.rows[0];
};