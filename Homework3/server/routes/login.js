const config = require('config');
const express = require('express');
const passport = require('../auth/authenticator');
const jwt = require('jsonwebtoken');
const secret = config.get('Customer.secret');
const JWT_EXPIRATION_MS = 3600 * 24 * 1000;

const router = express.Router();

/**
 * @api {post} /api/login login user
 * @apiName PostUser
 * @apiGroup User
 *
 * @apiParam {String} email User's email.
 * @apiParam {String} password User's password.
 *
 * @apiSuccess {String} token User jwt.
 * @apiSuccess {String} id User unique id.
 * @apiSuccess {String} email User email.
 * @apiSuccess {Date} expires Date of expiration
 *
 * @apiError UserDoesntExist This user doesn't exist.
 * @apiError UserWrongPassword Wrong password.
 * @apiError UserWasntLogined User wasn't logined.
 */


router.post('/', (req, res) => {
  passport.authenticate('local', {session: false}, (error, user) => {
    if (error || !user) {
      res.status(400).json({error: error});
    } else {
      const payload = {
        email: user.email,
        expires: Date.now() + JWT_EXPIRATION_MS,
        id: user._id,
      };
      req.login(payload, {session: false}, (error) => {
        if (error) {
          res.status(400).send({error});
        }

        const token = jwt.sign(JSON.stringify(payload), secret);

        res.status(200).send({token: token, id: user._id});
      });
    }
  })(req, res);
});

module.exports = router;
