const Joi = require('joi')

exports.userDepositSchema = Joi.object({
    deposit: Joi.number()
    .precision(2)
    .positive()
    .required()
})