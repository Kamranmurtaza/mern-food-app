const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().min(1).required(),
  password: Joi.string().min(3).required(),
});

const registerSchema = Joi.object({
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  email: Joi.string().min(1).required(),
  password: Joi.string().min(3).required(),
  isRestaurantOwner: Joi.boolean(),
});

module.exports = { loginSchema, registerSchema };
