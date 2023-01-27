const express = require('express');
const router = express.Router();
const routesRoute = require('./routes')
const { requestLogger } = require('../util');


router.use('/',routesRoute)

module.exports = router;