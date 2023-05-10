const express = require('express');
const { Course } = require('../../../database/models/Course');
const { User } = require('../../../database/models/User');
const router = express.Router();

router.get('/', async (req, res) => {


    const user = await User.findById(req.user._id)

    if (!user) return res.status(404).json({ message: 'user can not be found' })


    if (user.accountType == 'leaner') {

        const courses = await Course.find({ approved: true, students: { $in: [user._id] } });

        return res.json({ enrollments: courses });
    }

    if (user.accountType == 'instructor') {

        const courses = await Course.find({ author: user._id });

        return res.json({ courses });
    }

    return res.json({ enrollments: [],courses:[] });

})

module.exports = router;