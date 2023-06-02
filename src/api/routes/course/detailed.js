const express = require('express');
const { Course } = require('../../../database/models/Course');
const { User } = require('../../../database/models/User');
const router = express.Router();

router.get('/:courseId', async (req, res) => {


    const course = await Course.findOne({ approved: true,_id: req.params.courseId, students: {$in : req.user._id}}).populate('author');


    return res.json({ course });

})



module.exports = router;