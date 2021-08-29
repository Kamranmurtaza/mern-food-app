const Joi = require('joi');

const mealSchema = Joi.object({
  name: Joi.string().min(1).required(),
  description: Joi.string().min(1),
  price: Joi.number().min(0).required(),
});

const editMealSchema = Joi.object({
  name: Joi.string().min(1),
  description: Joi.string().min(1),
  price: Joi.number().min(0),
});

module.exports = { mealSchema, editMealSchema };
