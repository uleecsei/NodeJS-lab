const Joi = require('@hapi/joi');

const truckSchema = Joi.object({
  type: Joi.string()
      .valid('Sprinter', 'Small straight', 'Large straight')
      .required(),
});

module.exports = truckSchema;
