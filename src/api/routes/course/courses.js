const express = require('express');
const { Course } = require('../../../database/models/Course');
const { User } = require('../../../database/models/User');
const { upload } = require('../../../util/upload');
const router = express.Router();

router.get('/', async (req, res) => {

  const tags = await Course.aggregate([
    { $match: { approved: true } },
    { $unwind: "$tag" },
    { $group: { _id: "$tag" } },
    { $limit: 10 },
    { $project: { _id: 0, tag: "$_id" } }
  ]);

  const courses = await Course.find({ approved: true }).populate('author');


  return res.json({ courses, tags });

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

router.get('/top-selling', async (req, res) => {

  const tags = await Course.aggregate([
    { $match: { approved: true } },
    { $unwind: "$tag" },
    { $group: { _id: "$tag" } },
    { $limit: 10 },
    { $project: { _id: 0, tag: "$_id" } }
  ]);

  try {
    // Find the top 3 selling courses based on the number of students enrolled
    const topSellingCourses = await Course.find().populate('author')
      .sort({ students: -1 }) // Sort in descending order based on the number of students
      .limit(3);

    return res.json({ courses: topSellingCourses, tags });

  } catch (error) {

    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }


})

router.get('/:courseId/enrolled', async (req, res) => {

  const course = await Course.findOne({ approved: true }).populate('students');

  return res.json({ course })
})

module.exports = router;