const express = require('express');
const router = express.Router();
const courseRoute = require('./courses');
const myCourseRoute = require('./myCourses');
const searchRoute = require('./search');

const authenticateToken = require('../../middlewares/auth');

router.use('/',authenticateToken,courseRoute)
router.use('/mycourses',authenticateToken,myCourseRoute)
router.use('/search',authenticateToken,searchRoute)


module.exports = router;