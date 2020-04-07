const Joi = require('@hapi/joi');

const loadSchema = Joi.object({
  name: Joi.string()
      .alphanum()
      .required(),
  dimensions: {
    width: Joi.number()
        .min(1)
        .max(200)
        .required(),
    height: Joi.number()
        .min(1)
        .max(350)
        .required(),
    length: Joi.number()
        .min(1)
        .max(700)
        .required(),
    weight: Joi.number()
        .min(1)
        .max(4000)
        .required(),
    status: Joi.string().valid('NEW', 'POSTED', 'ASSIGNED', 'SHIPPED'),
    state: Joi.string().valid(
        'En route to Pick Up',
        'Arrived to Pick Up',
        'En route to Delivery',
        'Arrived to Delivery',
    ),
  },
  logs: Joi.string().alphanum(),
});

module.exports = loadSchema;
