const express = require('express');
const { Topic } = require('../../../database/models/Topic');
const { Course } = require('../../../database/models/Course');
const { User } = require('../../../database/models/User');
const router = express.Router();

router.get('/:courseId', async (req, res) => {

    const course = await Course.findById(req.params.courseId);

    if (!course) return res.status(403).json({ message: 'Course not found.' })

    let topics = await Topic.find({ course: course.id }).populate('media')


    return res.json({ topics });

})


router.post('/', async (req, res) => {

    

    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: 'User not found' })

    const course = await Course.findById(req.body.course);

    if (!course) return res.status(404).json({ message: 'Invalid course given' })

    if (course.author.toString() !== req.user._id) return res.status(403).json({ message: 'You dont have access to this course' })

    const topic = await Topic.create({
        course: req.body.course,
        title: req.body.title,
    })




    return res.json({topic, message: "created sussefully" })
})


module.exports = router;