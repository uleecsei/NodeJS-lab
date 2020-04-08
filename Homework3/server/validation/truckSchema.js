const Joi = require('@hapi/joi');

const truckSchema = Joi.object({
  type: Joi.string()
      .required(),
});

module.exports = truckSchema;
