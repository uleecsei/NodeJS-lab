const express = require('express');
const app = express();

//pages render
const homeRoute = require('./routes/home');
const profileRoute = require('./routes/profile');
const signupRoute = require('./routes/signup');

//authorization
const login = require('./auth/login');
//authentification
const auth = require('./auth/authentification');

app.use(login);
app.use(auth);
app.use(homeRoute);
app.use(profileRoute);
app.use(signupRoute);

app.listen(8080);
