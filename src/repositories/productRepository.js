const pool = require('../../db.js');

exports.products = async () => {
    const result = await pool.query(
    `SELECT products.title AS product_title, products.price FROM products WHERE products.stock > 0`)
    return result.rows};

exports.productById = async (productId) => {
    const result = await pool.query(
    `SELECT id, title, price FROM products WHERE id = $1`, 
    [productId]);
    return result.rows[0];
};

