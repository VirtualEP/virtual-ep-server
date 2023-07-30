const express = require('express');
const { User } = require('../../../database/models/User');
const router = express.Router();
const bcrypt = require("bcrypt");
const generateAccessToken = require('../../../util/signJwt');
const authenticateToken = require('../../middlewares/auth');
const { Course } = require('../../../database/models/Course');

router.get('/', authenticateToken, async (req, res) => {
    try {
        // TODO: count couses with author of user id
        const courses = await Course.find({ author: req.user._id });
        // account balance
        const user = await User.findById(req.user._id)
        // get count of total enrollemtn accross
        total_enrollemts = 0;

        courses.map((course) => {
            total_enrollemts += course.enrollment.length;
        });
        // get 5 recent enrollments
        return res.status(200).json({
            courses: courses.length,
            balance:user.balance,
            enrollments: total_enrollemts,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong. Please try again later.', error: error.message });
    }
});

module.exports = router;
