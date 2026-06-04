const express = require('express');
const userRouter = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');
const schema = require('../vaildators/userValidator')
const validator = require('../middlewares/validMiddleware')


userRouter.get('/checkBalance', authMiddleware, userController.checkBalance);

/**
 * @swagger
 * /user/deposit:
 *   patch:
 *     summary: Deposit (by User)
 *     tags: [User]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deposit:
 *                 type: number
 *                 example: 10.30
 *
 *     responses:
 *       200:
 *         description: Balance updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not user)
 */
userRouter.patch('/deposit', authMiddleware, validator(schema.userDepositSchema), userController.topUpBalance)

module.exports = userRouter