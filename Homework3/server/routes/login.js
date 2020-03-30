const config = require('config');
const express = require('express');
const passport = require('../auth/authenticator');
const jwt = require('jsonwebtoken');
const secret = config.get('Customer.secret');
const JWT_EXPIRATION_MS = 3600 * 24 * 1000;

const router = express.Router();

router.post('/login', (req, res) => {
  passport.authenticate('local', {session: false}, (error, user) => {
    if (error || !user) {
      res.status(400).json({error: error.message});
    } else {
      const payload = {
        username: user.email,
        expires: Date.now() + JWT_EXPIRATION_MS,
      };

      req.login(payload, {session: false}, (error) => {
        if (error) {
          res.status(400).send({error});
        }

        const token = jwt.sign(JSON.stringify(payload), secret);

        res.cookie('jwt', token, {httpOnly: true, secure: true});
        res.status(200).send(payload.username);
      });
    }
  })(req, res);
});

module.exports = router;
