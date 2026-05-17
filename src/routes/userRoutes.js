const express = require('express');
const userRouter = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

userRouter.get('/checkBalance', authMiddleware, userController.checkBalance);
userRouter.patch('/deposit', authMiddleware, userController.topUpBalance)

module.exports = {userRouter}