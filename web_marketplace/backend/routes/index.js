const express = require('express');
const route = express.Router();
const authRoute = require('./auth');
const { authLimiter, apiLimiter } = require('../middleware/rateLimiter');

route.use('/auth', authLimiter, authRoute);

module.exports = route;