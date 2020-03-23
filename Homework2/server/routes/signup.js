const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/signup', (req, res) => {
    let filePath = path.join(__dirname, '/../../client','pages','signup.html');
    fs.readFile(filePath, (err, data) => {
        if(err) {
            throw err;
        }
        res.type('html');
        res.send(data);
    });
});

module.exports = router;