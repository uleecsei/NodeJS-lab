const config = require('config');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const secret = config.get('Customer.secret');
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.use(
    new LocalStrategy(
        {
          usernameField: 'username',
          passwordField: 'password',
        },
        async (username, password, done) => {
          try {
            const userDocument = await User.findOne({
              username: username,
            });
            if (!userDocument) {
              throw done('User not found!');
            }
            const passwordsMatch = await bcrypt.compareSync(
                password,
                userDocument.password,
            );
            if (passwordsMatch) {
              return done(null, userDocument);
            } else {
              return done('Incorrect Username / Password');
            }
          } catch (error) {
            done(error);
          }
        },
    ),
);

passport.use(
    new JWTStrategy(
        {
          jwtFromRequest: (req) => req.cookies.jwt,
          secretOrKey: secret,
        },
        (jwtPayload, done) => {
          if (Date.now() > jwtPayload.expires) {
            return done('jwt expired');
          }

          return done(null, jwtPayload);
        },
    ),
);

module.exports = passport;
