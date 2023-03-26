const express = require('express');
const router = express.Router();
const courseRoute = require('./courses');
const myCourseRoute = require('./myCourses');

const authenticateToken = require('../../middlewares/auth');

router.use('/explore',authenticateToken,courseRoute)
router.use('/mycourses',authenticateToken,myCourseRoute)


module.exports = router;