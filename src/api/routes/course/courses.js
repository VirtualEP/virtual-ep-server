const express = require('express');
const { Course } = require('../../../database/models/Course');
const { User } = require('../../../database/models/User');
const { upload } = require('../../../util/upload');
const router = express.Router();

router.get('/', async (req, res) => {

    const courses = await Course.find({ approved: true }).populate('author');


    return res.json({ courses });

})

router.post('/', upload.single("cover"), async (req, res) => {

    console.log(req.file, req.body.action);



    const user = await User.findById(req.user._id)


    if (user.accountType !== 'instructor') return res.status(403).json({ message: 'You do not have permisions to create a course' });

    const course = await Course.create({
        author: user._id,
        cover: req.file.path,
        tag: req.body.tags,
        discription: req.body.discription,
        title: req.body.title,
    })


    return res.json({ course: course, message: "Created Successfully", error: false })
})

router.get('/:courseId/enrolled', async (req, res) => {

    const course = await Course.findOne({ approved: true }).populate('students');

    return res.json({ course })
})

module.exports = router;