const productRepository = require('../repositories/productRepository.js')

exports.products = async (req, res) => {
    const productsList = await productRepository.products(req.body)
    res.status(200).json(productsList);
};