const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const cartSchema = Joi.object({
  cartId: Joi.objectId(),
  restaurantId: Joi.objectId().required(),
  items: Joi.array().required(),
});

module.exports = { cartSchema };
