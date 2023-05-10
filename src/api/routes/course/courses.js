const express = require('express');
const { Course } = require('../../../database/models/Course');
const { User } = require('../../../database/models/User');
const router = express.Router();

router.get('/', async (req, res) => {

    const courses = await Course.find({ approved: true }).populate('author');


    return res.json({ courses });

})


router.post('/', async (req, res) => {

    const user = await User.findById(req.user._id)


    if (user.accountType !== 'instructor') return res.status(403).json({ message: 'You do not have permisions to create a course' });

    const course = await Course.create({
        author: req.user._id,
        cover: req.body.cover,
        tag: req.body.tags,
        discription: req.body.discription,
        title: req.body.title,
    })


    return res.json({course,message:"created sussefully"})
})

module.exports = router;