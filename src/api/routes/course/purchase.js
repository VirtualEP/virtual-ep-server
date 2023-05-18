const express = require('express');
const { Course } = require('../../../database/models/Course');
const { User } = require('../../../database/models/User');
const { Purchase } = require('../../../database/models/Purchase');
const { Notification } = require('../../../database/models/Notification');
var AES = require("crypto-js/aes");
const { Thread } = require('../../../database/models/Thread');
const router = express.Router();

router.post('/', async (req, res) => {

    /*
        req.body = {
            course,refrence
        }
    */

    let data = req.body;

    if (!data) return res.status(403).json({ message: 'un-trusted source' })



    // get course
    const course = await Course.findById(data.course).populate(['threads', 'author'])

    if (!course) return res.status(404).json({ message: 'Course not found' })

    // check if student already purchased
    if (course.students.includes(req.user._id)) return res.json({ message: 'Course already purchased' })

    await Course.findOneAndUpdate({ _id: course._id }, { $push: { students: req.user._id } })

    await User.findOneAndUpdate({ _id: req.user._id }, { $push: { enrollment : course._id } })

    // create proff of payment and update creators account balance
    const purchase = await Purchase.create({
        amount: course.price,
        refrence: data.refrence,
        course: course._id,
        user: req.user._id
    })

    // update creator account balance
    await User.findByIdAndUpdate(course.author._id, { balance: course.author.balance + course.price })

    await Notification.create({
        content: 'New student enrolled to your course ' + course.title + ".",
        to: course.author._id,
        refrence: data.refrence,
        data: {
            student: req.user,
            course: course,
            parchase: purchase
        },
        from: 'iLearn'
    })

    return res.json({ course, message: 'Course purchase successfully' });

})

module.exports = router;