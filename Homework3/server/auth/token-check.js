const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('Customer.secret');

module.exports = (req, res, next) => {
  try {
    const jwtToken = req.headers['token'];
    if (jwtToken && jwtToken !== 'undefined') {
      const user = jwt.verify(jwtToken, secret);
      if (user) {
        req.payload = user;
        next();
      } else {
        res.status(401).json({status: 'Unauthorized'});
        res.end();
      }
    } else {
      res.status(401).json({status: 'Unauthorized'});
    }
  } catch (err) {
    res.status(401).json({error: err.message});
  }
};
