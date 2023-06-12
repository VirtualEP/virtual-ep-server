const express = require('express');
const router = express.Router();
const authRoute = require('./auth')
const courseRoute = require('./course')
const topicRoute = require('./topic')
const uploadRoute = require('./upload')
const profileRoute = require('./profile')
const authenticateToken = require('./../middlewares/auth');

router.use('/auth',authRoute)
router.use('/course',courseRoute)
router.use('/settings',authenticateToken,profileRoute)
router.use('/topic',authenticateToken, topicRoute)
router.use('/upload',authenticateToken, uploadRoute)

module.exports = router;