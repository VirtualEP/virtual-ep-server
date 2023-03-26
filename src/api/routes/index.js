const express = require('express');
const router = express.Router();
const authRoute = require('./auth')
const courseRoute = require('./course')

router.use('/auth',authRoute)
router.use('/course',courseRoute)

module.exports = router;