const Joi = require('@hapi/joi');

const userSchema = Joi.object({
  name: Joi.string()
      .alphanum(),

  surname: Joi.string()
      .alphanum(),

  username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),

  password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: {allow: ['com', 'net']},
  }),

  role: Joi.string().alphanum().required(),
});

module.exports = userSchema;
