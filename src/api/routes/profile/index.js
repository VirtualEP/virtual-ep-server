const express = require('express');
const router = express.Router();
const userRoute = require('./user')
const notificationRoute = require('./notification')
const securityRoute = require('./security')

router.use(express.json());

router.use('/user', userRoute)
router.use('/notification', notificationRoute)
router.use('/security', securityRoute)

module.exports = router;