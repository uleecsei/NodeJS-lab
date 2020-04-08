const express = require('express');
const router = express.Router();
const tokenCheck = require('../auth/token-check');
const User = require('../models/User');
const Truck = require('../models/Truck');
const Load = require('../models/Load');
const bcrypt = require('bcrypt');

/**
 * @api {get} /api/profile/:id getting user parameters
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiHeader {String} payload User's jwt from local storage.
 *
 * @apiSuccess {String} userFound Returning User's data.
 *
 * @apiError UserIsUnAuthorized User is not authorized.
 * @apiError UserWasNotFound Server can not find a user
 * @apiError WrongId TokenId and url's id do not match
 * */

router.get('/:id', tokenCheck, async (req, res) => {
  try {
    if (req.params.id != req.payload.id.toString()) {
      throw 'Wrong id';
    }
    User.findById(req.payload.id, async (err, response) => {
      if (err) {
        res.status(500).json({message: 'Can not get a profile', error: err});
      }
      const payload = Object.assign({}, response._doc);
      const userId = req.payload.id;
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
        res.status(500).json({message: 'Can not get a profile'});
      }
    });
  } catch (err) {
    res.status(500).json({message: 'Can not get a profile', error: err});
  }
});

/**
 * @api {put} /api/profile/:id/password changing User's password
 * @apiName putUser
 * @apiGroup User
 *
 * @apiHeader {String} payload User's jwt from local storage.
 * @apiHeader {String} oldPassword current User's password
 * @apiHeader {String} newPassword new User's password
 *
 * @apiSuccess {String} message Successful update
 *
 * @apiError PasswordIsRequired Your password or/and new password required
 * @apiError UserWasNotFound Server can not find a user
 * @apiError WrongId TokenId and url's id do not match
 * */

router.put('/:id/password', tokenCheck, async (req, res) => {
  try {
    if (req.params.id != req.payload.id.toString()) {
      throw 'Wrong id';
    }
    User.findById(req.payload.id, async (err, response) => {
      try {
        if (err) {
          throw err;
        }
        const isOnLoad = await Truck.find({
          created_by: req.payload.id,
          status: 'OL',
        });

        if (isOnLoad.length) {
          res.status(500).json({message: 'Driver is busy'});
        }
        if (!req.body.oldPassword || !req.body.newPassword) {
          throw 'Your password or/and new password required';
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
          res.status(200).json({message: 'Successful update'});
        } else {
          res.status(400).json({message: 'Wrong password'});
        }
      } catch (err) {
        res.status(500).json({
          message: 'Profile data was not changed',
          error: err,
        });
      }
    });
  } catch (err) {
    res
        .status(500)
        .json({message: 'Profile data was not changed', error: err});
  }
});

/**
 * @api {delete} /api/profile/:id delete an account
 * @apiName deleteUser
 * @apiGroup User
 *
 * @apiHeader {String} payload User's jwt from local storage.
 *
 * @apiSuccess {String} message User was deleted
 *
 * @apiError UserWasNotFound Server can not find a user
 * @apiError WrongId TokenId and url's id do not match
 * */


router.delete('/:id', tokenCheck, async (req, res) => {
  try {
    if (req.params.id != req.payload.id.toString()) {
      throw 'Wrong id';
    }
    await User.findByIdAndDelete(req.payload.id, (err, response) => {
      if (err) {
        res.status(500).json({message: 'User was not deleted', err});
      } else {
        res.status(200).json({message: 'User deleted with success'});
      }
    });
  } catch (err) {
    res.status(500).json({message: 'User was not delete', err});
  }
});

module.exports = router;
