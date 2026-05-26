const {Product} = require('../models');
const {Op} = require('sequelize');

exports.products = async () => {
    return Product.findAll({
        attributes: [
            ['title', 'product_title'],
            'price',
            'category'], 
        where: {
            stock: {
                [Op.gt] : 0
            }
        },
        raw: true        
    });
};

exports.productByCategory = async (category) => {
    return Product.findAll({
        attributes: [
            ['title', 'product_title'],
            'price'
        ],
        where: {
            category,
            stock: {[Op.gt]: 0}
        },
        raw: true
    })
} 