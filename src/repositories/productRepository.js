const pool = require('../../db.js');

exports.products = async () => {
    const result = await pool.query(
    'SELECT products.title AS product_title, products.price FROM products WHERE products.stock > 0')
    return result.rows};