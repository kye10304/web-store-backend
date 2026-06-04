const {register, login} = require('../services/authService');

const controllerRegister = async (req, res) => {
    try {
        const user = await register(req.body);

        res.status(201).json({
            id: user.id,
            email: user.email,
            password_hash: user.passwordHash
        })
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const controllerLogin = async (req, res) => {
    try {
        const token = await login(req.body);
        
        res.status(200).json({token})
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
};

module.exports = {
    controllerRegister,
    controllerLogin
}