const express = require('express');
const authRouter = express.Router();
const {
    controllerRegister,
    controllerLogin,
} = require('../controllers/authController');

authRouter.post('/register', controllerRegister);
authRouter.post('/login', controllerLogin);


module.exports = { authRouter };