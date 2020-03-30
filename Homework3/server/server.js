const express = require('express');
const app = express();
const config = require('config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const tokenCheck = require('./auth/token-check');

const dbConfig = config.get('Customer.dbConfig');


app.use(bodyParser.json());

mongoose.connect(dbConfig.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(registerRoute);
app.use(loginRoute);

app.use(tokenCheck);

app.listen(8082);
