const express = require('express');
const User = require('../models/User');
const userSchema = require('../validation/userSchema');
const router = express.Router();

/**
 * @api {post} /api/auth/register Register new user.

 * @apiName PostRegister
 * @apiGroup Auth
 *
 * @apiHeader {String} content-type Payload content type.
 * @apiHeaderExample {json} Content-type header example
 *               { "Content-type": "application/json" }
 *
 * @apiParam {String} username User's Username.
 * @apiParam {String} email User's email.
 * @apiParam {String} password Password.
 * @apiParam {String} role User's User type(driver or shipper), shoudnt be case sensitive.
 * @apiParam {String} name User's first name.
 * @apiParam {String} surname User's last name.
 *
 * @apiParamExample {json} Payload example:
 *               {
    "username": "Kyrylo",
    "password": "test1234",
    "role": "shipper" }
 *
 * @apiSuccess {String} status Operation status.
 *
 * @apiSuccessExample {json} Success-Response:
 *                 { "status": "User registered successfully"}
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
        return res.status(200).json({status: 'User registered successfully'});
      }
    });
  } catch (error) {
    res.status(400).send({error});
  }
});

module.exports = router;
