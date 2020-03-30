const Joi = require('@hapi/joi');

const validator = Joi.object({
  name: Joi.string()
      .alphanum()
      .required(),

  surname: Joi.string()
      .alphanum()
      .required(),

  username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),

  password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),

  repeat_password: Joi.ref('password'),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: {allow: ['com', 'net']},
  }),

  role: Joi.string().alphanum(),
}).with('password', 'repeat_password');

module.exports = validator;
