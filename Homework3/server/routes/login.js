const config = require('config');
const express = require('express');
const passport = require('../auth/authenticator');
const jwt = require('jsonwebtoken');
const secret = config.get('Customer.secret');
const JWT_EXPIRATION_MS = 3600 * 24 * 1000;

const router = express.Router();

/**
 * @api {post} /api/auth/login Login endpoint.
 *
 * @apiName PostLogin
 * @apiGroup Auth
 *
 * @apiHeader {String} content-type Payload content type.
 * @apiHeaderExample {json} Content-type header example
 *               { "Content-type": "application/json" }
 *
 * @apiParam {String} username Username.
 * @apiParam {String} password Password.
 * @apiParamExample {json} Payload example:
 *               { "username": "Kyrylo", "password": "test1234" }
 *
 * @apiSuccess {String} status Operation status.
 * @apiSuccess {String} token JWT token.
 * @apiSuccess {String} id User's id.
 *
 * @apiSuccessExample {json} Success-Response:
 *                 { "status": "User authenticated successfully"
  "token": "fnawilfmnaiwngainegnwegneiwngoiwe",
  "id": "12345" }
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
        role: user.role,
      };
      req.login(payload, {session: false}, (error) => {
        if (error) {
          res.status(400).send({error});
        }

        const token = jwt.sign(JSON.stringify(payload), secret);

        res.status(200).send({
          status: 'User authenticated successfully',
          token: token,
          id: user._id,
        });
      });
    }
  })(req, res);
});

module.exports = router;
