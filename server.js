const http = require('http');
const fs = require('fs');
let file = {
    "logs": [],
}

http.createServer((req, res) => {
    res.setHeader('Content-type','text/html');
    file.logs.push({
        method: req.method,
        url: req.url,
        time: new Date().getTime(),
    });
    let responseFile = JSON.stringify(file);
    fs.writeFile('file.json', responseFile, (err) => {
        if (err) {
            throw err;
        }
    });
    res.end("{status : 'ok'}");
}).listen(8080);