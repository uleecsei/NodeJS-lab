const express = require('express');
const app = express();
const config = require('config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const profileRoute = require('./routes/profile');
const truckRoute = require('./routes/trucks');
const loadRoute = require('./routes/loads');
const cors = require('cors');
const morgan = require('morgan');


const dbConfig = config.get('Customer.dbConfig');

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

mongoose.connect(dbConfig.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);
app.use('/api/profile', profileRoute);
app.use('/api/truck', truckRoute);
app.use('/api/load', loadRoute);

app.listen(8082);
