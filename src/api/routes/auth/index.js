const express = require('express');
const router = express.Router();
const loginRoute = require('./login')
const registerRoute = require('./register')
const verifyRoute = require('./verification')
const tokenRoute = require('./tokens')

router.use(express.json());

router.use('/login', loginRoute)
router.use('/register', registerRoute)
router.use('/verify', verifyRoute)
router.use('/tokens', tokenRoute)

module.exports = router;