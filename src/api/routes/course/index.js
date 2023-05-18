const express = require('express');
const router = express.Router();
const courseRoute = require('./courses');
const myCourseRoute = require('./myCourses');
const searchRoute = require('./search');
const paidRoute = require('./purchase');
const detailedRoute = require('./detailed');

const authenticateToken = require('../../middlewares/auth');

router.use('/',authenticateToken,courseRoute)
router.use('/mycourses',authenticateToken,myCourseRoute)
router.use('/search',authenticateToken,searchRoute)
router.use('/paid',authenticateToken,paidRoute)
router.use('/single',authenticateToken,detailedRoute)


module.exports = router;