const express = require('express');
const route = express.Router();
const authRoute = require('./auth');
const packageRoute = require('./packageRoutes');
const { authLimiter, apiLimiter } = require('../middleware/rateLimiter');

route.use('/auth', authLimiter, authRoute);
route.use('/packages', packageRoute);

module.exports = route;