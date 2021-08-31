const Joi = require('joi');
const { statusKeyToValue } = require('../constants/order-statuses');
Joi.objectId = require('joi-objectid')(Joi);

const updateOrderSchema = Joi.object({
  status: Joi.string().valid(...Object.keys(statusKeyToValue)),
});

const createOrderSchema = Joi.object({
  restaurantId: Joi.objectId().required(),
  items: Joi.array().required(),
});

module.exports = { updateOrderSchema, createOrderSchema };
