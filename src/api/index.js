const express = require('express');
const router = express.Router();
const routesRoute = require('./routes')


router.use('/',routesRoute)

module.exports = router;