const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController.js');
const schema = require('../vaildators/productValidator')
const validator = require('../middlewares/validMiddleware')

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Products list
 *     tags: [Products]
 *
 *     parameters:
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *         example: food
 *
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   product_title:
 *                     type: string
 *                     example: Keyboard
 *                   price:
 *                     type: number
 *                     example: 20.99
 */
productRouter.get('/', validator(schema.productsSchema, 'query'), productController.products);

module.exports = productRouter;
