const {register, login} = require('../services/authService');

const controllerRegister = async (req, res) => {
    const user = await register(req.body);
    res.status(201).json(user);
};

const controllerLogin = async (req, res) => {
    const token = await login(req.body);
    res.status(200).json(token);
};

module.exports = {
    controllerRegister,
    controllerLogin
}