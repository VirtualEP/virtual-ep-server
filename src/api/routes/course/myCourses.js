const express = require('express');
const { Course } = require('../../../database/models/Course');
const router = express.Router();

router.get('/', async (req, res) => {

    const user = req.user;

    const courses = await Course.find({ approved: true, students: { $in: [user._id] } });


    return res.json({ enrollments: courses });

})

module.exports = router;