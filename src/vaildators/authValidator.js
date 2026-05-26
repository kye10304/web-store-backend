const Joi = require('joi');

exports.userAuthSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(5).max(30).required()
})