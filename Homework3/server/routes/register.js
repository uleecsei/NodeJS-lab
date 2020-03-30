const express = require('express');
const User = require('../models/User');
const validator = require('../auth/validator');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const isValid = await validator.validateAsync({
      name: req.body.name,
      surname: req.body.surname,
      username: req.body.username,
      password: req.body.password,
      repeat_password: req.body.repeat_password,
      email: req.body.email,
      role: req.body.role,
    });
    if (isValid) {
      const userData = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role || 'shipper',
      };

      // using schema.create to insert data into the db
      User.create(userData, function(err, user) {
        if (err) {
          return next(err);
        } else {
          return res.status(200).send();
        }
      });
    }
  } catch (error) {
    res.status(400).send({error});
  }
});

module.exports = router;
