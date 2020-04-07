const express = require('express');
const User = require('../models/User');
const userSchema = require('../validation/userSchema');
const router = express.Router();

/**
 * @api {post} /api/register register user
 * @apiName PostUser
 * @apiGroup User
 *
 * @apiParam {String} login User's login.
 * @apiParam {String} email User's email.
 * @apiParam {String} password User's password.
 * @apiParam {String} role User's role.
 * @apiParam {String} name User's first name.
 * @apiParam {String} surname User's last name.
 *
 * @apiSuccess {String} 200 returns success code.
 *
 * @apiError UserIsInvalid User's data didn't pass the validation.
 * @apiError UserWasntRegistered User was not registered.
 */

router.post('/', async (req, res, next) => {
  try {
    const {value, error} = userSchema.validate(req.body);
    if (error) {
      throw error.details[0].message;
    }

    User.create(value, function(err, user) {
      if (err) {
        return next(err);
      } else {
        return res.status(200).send();
      }
    });
  } catch (error) {
    res.status(400).send({error});
  }
});

module.exports = router;
