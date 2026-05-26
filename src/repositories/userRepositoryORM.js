const {User} = require('../models')

exports.findByEmail = async (email) => {
    const user = await User.findOne({
        where: {email}
    })
    if (!user) return null;

    return user.toJSON();
};

exports.userBalanceById = async (userId) => {
    const user = await User.findByPk(userId, {
        attributes: ['balance']
    })
    if (!user) return null;
    return {balance: user.balance};
   };

exports.create = async ({ email, passwordHash }) => {
    const user = await User.create({ email, 
        password_hash: passwordHash});
        return user.toJSON();
    };    
    
exports.updateBalance = async (userId, amount) => {
    await User.increment(
        {balance: amount},
        {where: {id: userId}}
    );

    const user = await User.findByPk(userId, {
        attributes: ['id', 'balance']
    })
    if (!user) return null
    return user.toJSON();   
}