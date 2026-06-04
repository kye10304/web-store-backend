const express = require('express');
const mainRouter = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: API welcome message
 *     tags: [Main]
 *
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Welcome into Web Store
 */
mainRouter.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome into Web Store'});
});

module.exports = mainRouter;
