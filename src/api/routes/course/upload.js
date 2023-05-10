const express = require('express');
const { Course } = require('../../../database/models/Course');
const router = express.Router();

router.post('/', async (req, res) => {

    const {} = req.body;

    const courses = await Course.find({ approved: true });


    return res.json({ courses });

})

module.exports = router;