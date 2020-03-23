const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const secret = require("./secret").secret;

router.post('/login', jsonParser, (req, res) => {
    let {email, password} = req.body;

    //reading JSON file with users data and parsing it into Array
    let users = Array.from(JSON.parse(fs.readFileSync(path.join(__dirname, '../data', 'users.json')))); 

    let [user] = users.filter((user) => user.email == email && user.password == password);

    if(!user){
        res.status(401).json({status: 'User not found'});
    }
    else{
        let jwt_token = jwt.sign(user, secret);
        res.json({jwt_token});
    }
});

module.exports = router;