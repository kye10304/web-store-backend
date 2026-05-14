const express = require('express');
const authRouter = express.Router();
const {
    controllerRegister,
    controllerLogin,
} = require('../controllers/authController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

//const orderController = require('../controllers/order.controller');

authRouter.post('/register', controllerRegister);
authRouter.post('/login', controllerLogin);

/*
authRouter.patch(
    '/:id/status',
    authMiddleware,
    roleMiddleware('admin'),
    (req, res) => {
      res.send('Status updated')
    }
  )
*/

module.exports = { authRouter };
