const jwt = require('jsonwebtoken');
const secret = require('./secret').secret;

module.exports = (req, res, next) => {
    let jwt_token = req.headers["authorization"];
    if(jwt_token && jwt_token !== "undefined"){
        let user = jwt.verify(jwt_token, secret);
        if(user) {
            req.user = user;
            next();
        }
        else {
            res.status(401).json({status: "Unauthorized"});
            res.end();
        }
    }
    else {
        next();
    }
}