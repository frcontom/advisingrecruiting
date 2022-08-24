const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//applying routes
app.use('/login',require('./auth.router'));
app.use('/profile',require('./profile.router'));
app.use('/user',require('./user.router'));
app.use('/category',require('./category.router'));
app.use('/store',require('./store.router'));
app.use('/product',require('./product.router'));

module.exports = app;
