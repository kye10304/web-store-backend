const userRepository = require('../repositories/userRepositoryORM');
const userService = require('../services/userService');

exports.checkBalance = async (req, res) => {
   try {
    const userId = req.user.id;
    const balance = await userRepository.userBalanceById(userId)
    res.status(200).json(balance)
   } catch (err) {
        const statusCode = err.statusCode || 500;
        
        return res.status(statusCode).json({
            message: err.message
        });
   }
}

exports.topUpBalance = async (req, res) => {    
    try {
        const userId = req.user.id;
        const deposit = req.body.deposit;
        const updateBalance = await userService.topUpBalance(userId, deposit);
        res.status(200).json(updateBalance)
    } catch (err) {
        const statusCode = err.statusCode || 500;
        
        return res.status(statusCode).json({
            message: err.message
        });
    }
}