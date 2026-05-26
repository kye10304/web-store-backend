/*const pool = require('../../db.js');

exports.products = async () => {
    const result = await pool.query(
    `SELECT products.title AS product_title, products.price, category FROM products WHERE products.stock > 0`)
    return result.rows};

exports.productById = async (productId) => {
    const result = await pool.query(
    `SELECT id, title, price, category FROM products WHERE id = $1`, 
    [productId]);
    return result.rows[0];
};

exports.productByCategory = async (category) => {
    const result = await pool.query(
        `SELECT title AS product_title, price FROM products WHERE category = $1`, 
        [category]);
        return result.rows
} */