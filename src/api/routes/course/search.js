const express = require('express');
const { Course } = require('../../../database/models/Course');
const router = express.Router();

router.get('/', async (req, res) => {

    const { q, tag } = req.query;

    console.log(req.query);

    if (tag) {
        const courses = await Course.find({ approved: true, tag: { "$in": [tag.toLowerCase()] } }).populate('author');;
        return res.json({ courses });
    }

    if (q) {
        const courses = await Course.find({ approved: true, title: { $regex: q.toLowerCase() } }).populate('author');;

        return res.json({ courses });
    }


    const courses = await Course.find({ approved: true }).populate('author');


    return res.json({ courses });




})

module.exports = router;