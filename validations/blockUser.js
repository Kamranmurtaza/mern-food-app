const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const blockUserSchema = Joi.object({
  buyerId: Joi.objectId().required(),
  block: Joi.boolean().required(),
});

module.exports = { blockUserSchema };
