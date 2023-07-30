const express = require('express');
const router = express.Router();
const overviewRoute = require('./overview')

router.use(express.json());

router.use('/overview', overviewRoute)


module.exports = router;