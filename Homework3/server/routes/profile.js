const express = require('express');
const router = express.Router();
const tokenCheck = require('../auth/token-check');
const User = require('../models/User');
const Truck = require('../models/Truck');
const Load = require('../models/Load');
const bcrypt = require('bcrypt');

/**
 * @api {get} /api/profile Getting user parameters.
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiHeader {String} content-type Payload content type.
 * @apiHeader {String} authorization Authorization value.
 * @apiHeaderExample {json} Content-type header example
 *               { "Content-type": "application/json" }
 * @apiHeaderExample {json} Authorization header example
 *               { "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe" }
 *
 * @apiSuccess {Object} payload Profile data
 * @apiSuccessExample {json} Success-Response:
 * {
    "role": "shipper",
    "_id": "5e8dcfbda51abaac2b0583f3",
    "username": "Kyrylo",
    "password": "$2b$10$IUr7xz3rhEIQjmZJfe0YZ.H3KbkZrDvVtIk.TvK9GTccWBmZIbJcK",
    "__v": 0,
    "loads": [...],
 }
 *
 * @apiError UserIsUnAuthorized User is not authorized.
 * @apiError UserWasNotFound Server can not find a user
 *
 * */

router.get('/', tokenCheck, async (req, res) => {
  try {
    const userId = req.payload.id;
    User.findById(userId, async (err, response) => {
      if (err) {
        res.status(500).json({status: 'Can not get a profile', error: err});
      }
      const payload = Object.assign({}, response._doc);
      if (payload.role == 'driver') {
        const trucks = await Truck.find({created_by: userId});
        const loads = await Load.find({assigned_to: userId});
        payload.loads = loads;
        payload.trucks = trucks;

        res.status(200).json(payload);
      } else if (payload.role == 'shipper') {
        const loads = await Load.find({created_by: userId});
        payload.loads = loads;

        res.status(200).json(payload);
      } else {
        res.status(500).json({status: 'Can not get a profile'});
      }
    });
  } catch (err) {
    res.status(500).json({status: 'Can not get a profile', error: err});
  }
});

/**
 * @api {patch} /api/profile/password Change User's password
 * @apiName putUser
 * @apiGroup User
 *
 * @apiHeader {String} content-type Payload content type.
 * @apiHeader {String} authorization Authorization value.
 * @apiHeaderExample {json} Content-type header example
 *               { "Content-type": "application/json" }
 * @apiHeaderExample {json} Authorization header example
 *               { "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe" }
 *
 * @apiParam {String} oldPassword current User's password
 * @apiParam {String} newPassword new User's password
 * @apiParamExample {json} Payload example:
 * {
 * "oldPassword": 123,
 * "newPassword": 1234
 * }
 *
 * @apiSuccess {String} status Successful update
 * @apiSuccessExample {json} Success-Response:{
 *  "status": "Successful update"
 * }
 *
 * @apiError PasswordIsRequired Your password or/and new password required
 * @apiError UserWasNotFound Server can not find a user
 * @apiError WrongId TokenId and url's id do not match
 * */

router.patch('/password', tokenCheck, async (req, res) => {
  try {
    const userId = req.payload.id;
    User.findById(req.payload.id, async (err, response) => {
      try {
        if (err) {
          throw err;
        }
        const isOnLoad = await Truck.find({
          created_by: userId,
          status: 'OL',
        });

        if (isOnLoad.length) {
          res.status(500).json({message: 'Driver is busy'});
        }
        if (!req.body.oldPassword || !req.body.newPassword) {
          throw Error('Your password or/and new password required');
        }
        const passwordMatch = bcrypt.compareSync(
            req.body.oldPassword,
            response.password,
        );
        if (passwordMatch) {
          const password = req.body.newPassword;
          const hashedPassword = bcrypt.hashSync(password, 10);
          await User.findByIdAndUpdate(req.payload.id, {
            $set: {password: hashedPassword},
          }),
          res.status(200).json({status: 'Successful update'});
        } else {
          res.status(400).json({status: 'Wrong password'});
        }
      } catch (err) {
        res.status(500).json({
          status: 'Profile data was not changed',
          error: err,
        });
      }
    });
  } catch (err) {
    res
        .status(500)
        .json({status: 'Profile data was not changed', error: err});
  }
});

/**
 * @api {delete} /api/profile/ Delete an account.
 * @apiName deleteUser
 * @apiGroup User
 *
 * @apiHeader {String} content-type Payload content type.
 * @apiHeader {String} authorization Authorization value.
 *
 * @apiHeaderExample {json} Content-type header example
 *               { "Content-type": "application/json" }
 * @apiHeaderExample {json} Authorization header example
 *               { "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe" }
 *
 * @apiSuccess {String} status Successful delete
 * @apiSuccessExample {json} Success-Response:{
 *  "status": "Successful deleted"
 * }
 *
 * @apiError UserWasNotFound Server can not find a user
 * @apiError WrongId TokenId and url's id do not match
 * */

router.delete('/:id', tokenCheck, async (req, res) => {
  try {
    const userId = req.payload.id;
    await User.findByIdAndDelete(userId, (err, response) => {
      if (err) {
        res.status(500).json({status: 'User was not deleted', err});
      } else {
        res.status(200).json({status: 'Successful delete'});
      }
    });
  } catch (err) {
    res.status(500).json({status: 'User was not delete', err});
  }
});

module.exports = router;
