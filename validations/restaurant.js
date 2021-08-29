const Joi = require('joi');

const restaurantSchema = Joi.object({
  name: Joi.string().min(1).required(),
  description: Joi.string().min(1),
});

const editRestaurantSchema = Joi.object({
  name: Joi.string().min(1),
  description: Joi.string().min(1),
});

module.exports = { restaurantSchema, editRestaurantSchema };
