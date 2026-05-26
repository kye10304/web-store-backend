const userRepository = require('../repositories/userRepositoryORM');
const userService = require('../services/userService');

exports.checkBalance = async (req, res) => {
   const userId = req.user.id;
   const balance = await userRepository.userBalanceById(userId)
    res.status(200).json(balance)
}

exports.topUpBalance = async (req, res) => {
    const userId = req.user.id;
    const deposit = req.body.deposit;
    const updateBalance = await userService.updateBalance(userId, deposit);
    res.status(200).json(updateBalance)
}