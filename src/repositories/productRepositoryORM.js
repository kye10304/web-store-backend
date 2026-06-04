const {Product} = require('../models');
const {Op, Sequelize} = require('sequelize');

exports.products = async (filter = {}, options = {}) => {
    const {
        id,
        minStock = 0,
        category
    } = filter
    
    return Product.findAll({
        attributes: [
            'id',
            ['title', 'product_title'],
            'price',
            'stock',
            'category'], 
        where: {
            stock: {
                [Op.gt] : minStock
            },
            /**
             * here we get: 
             * 1) ...(category && {category: category}) => ...(truthy && {truthy}) => ...({truthy}) => ...({category: category})
             * 2) ...({category: category}) => category: category.
            */ 
            ...(category && {category}),
            ...(id && {id}),
        }, 
        transaction: options.transaction,
        raw: true        
    });
};

exports.stockUpdate = async (id, quantity, options = {}) => {
    await Product.update({
        stock: Sequelize.literal(`stock - ${Number(quantity)}`)
    }, {
        where: {id},
        transaction: options.transaction
    })

    const newProduct = await Product.findByPk(id, {
        attributes: ['id', 'stock'],
        transaction: options.transaction
    })

    if (!newProduct) return null;

    return newProduct.toJSON()
}