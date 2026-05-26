const userRepository = require('../repositories/userRepositoryORM');

exports.topUpBalance = async (userId, deposit) => {
    if (deposit < 1) {
        throw new Error('Invalid operation. Your deposit cannot be less than 1$')
    };

    return await userRepository.topUpBalance(userId, deposit);

}

