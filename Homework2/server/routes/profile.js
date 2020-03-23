const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/profile', (req, res) => {
    if (!req.user || req.user === "undefined") {
        res.status(401).json({status: "Unauthorized"});
    } else {
        let filePath = path.join(__dirname, '/../../client', 'pages', 'profile.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                throw err;
            }
            res.type('html');
            res.send(data);
        });
    }
});

router.get('/styles/profile.css', (req, res) => {
    let filePath = path.join(__dirname, '/../../client', 'styles', 'profile.css');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            throw err;
        }
        res.type('css');
        res.send(data);
    });
});

router.get('/scripts/profile.js', (req, res) => {
    let filePath = path.join(__dirname, '/../../client', 'scripts', 'profile.js');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            throw err;
        }
        res.type('js');
        res.send(data);
    });
});

module.exports = router;