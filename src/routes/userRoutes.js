const express = require('express');
const userRouter = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');
const schema = require('../vaildators/userValidator')
const validator = require('../middlewares/validMiddleware')


userRouter.get('/checkBalance', authMiddleware, userController.checkBalance);
userRouter.patch('/deposit', authMiddleware, validator(schema.userDepositSchema), userController.topUpBalance)

module.exports = {userRouter}