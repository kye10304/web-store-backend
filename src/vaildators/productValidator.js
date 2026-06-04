const Joi = require('joi');
const {PRODUCT_CATEGORIES} = require('../config/constants')

exports.productsSchema = Joi.object({
    category: Joi.string().valid(...PRODUCT_CATEGORIES).optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10)
  });