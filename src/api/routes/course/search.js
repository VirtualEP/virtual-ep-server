const express = require('express');
const { Course } = require('../../../database/models/Course');
const router = express.Router();

router.get('/', async (req, res) => {

    const { q, tag } = req.query;


    if (tag) {
        const courses = await Course.find({ approved: true, tag: { "$in": [tag.toLowerCase()] } }).populate('author');;
        return res.json({ courses });
    }

    if (q) {
        const tags = await Course.aggregate([
            { $match: { approved: true } },
            { $unwind: "$tag" },
            { $group: { _id: "$tag" } },
            { $limit: 10 },
            { $project: { _id: 0, tag: "$_id" } }
        ]);
    
        const courses = await Course.find({ approved: true, title: { $regex: q, $options: 'i' } }).populate('author');;

        return res.json({ courses,tags });
    }


    const courses = await Course.find({ approved: true }).populate('author');


    return res.json({ courses });

})



router.get('/enquery', async (req, res) => {

    const { q } = req.query;



    const courses = await Course.find({
        students: req.user._id,
        $or: [
            { title: { $regex: q, $options: 'i' } }, // Search by title (case-insensitive)
            { tag: { $regex: q, $options: 'i' } } // Search by tag (case-insensitive)
        ]
    }).populate('author')

    return res.json({ courses });

})

module.exports = router;