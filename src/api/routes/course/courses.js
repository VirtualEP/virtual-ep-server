const express = require('express');
const { Course } = require('../../../database/models/Course');
const router = express.Router();

router.get('/', async (req, res) => {

    const courses = await Course.find({ approved: true });


    return res.json({ courses });

})

module.exports = router;