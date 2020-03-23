const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    let filePath = path.join(__dirname, '/../../client','pages','index.html');
    fs.readFile(filePath, (err, data) => {
        if(err) {
            throw err;
        }
        res.type('html');
        res.send(data);
    });
}); 

router.get('/styles/index.css', (req, res) => {
    let filePath = path.join(__dirname, '/../../client','styles','index.css');
    fs.readFile(filePath, (err, data) => {
        if(err) {
            throw err;
        }
        res.type('css');
        res.send(data);
    });
});

router.get('/scripts/index.js', (req, res) => {
    let filePath = path.join(__dirname, '/../../client','scripts','index.js');
    fs.readFile(filePath, (err, data) => {
        if(err) {
            throw err;
        }
        res.type('js');
        res.send(data);
    });
});


module.exports = router;


