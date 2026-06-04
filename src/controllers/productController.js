const productRepository = require('../repositories/productRepositoryORM.js')

exports.products = async (req, res) => {
    try {
        const productsList = await productRepository.products(req.query)
        res.status(200).json(productsList);
    } catch (err) {
        const statusCode = err.statusCode || 500;

        return res.status(statusCode).json({
            message: err.message
        })
    }
};