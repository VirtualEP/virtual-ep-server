const express = require('express');
const { Topic } = require('../../../database/models/Topic');
const { Course } = require('../../../database/models/Course');
const { User } = require('../../../database/models/User');
const { upload } = require('../../../util/upload');
const { Media } = require('../../../database/models/Media');
const router = express.Router();

router.get('/', async (req, res) => {



    return res.json({ message: 'we here' });

})


router.post('/', upload.single("media"), async (req, res) => {

    const topic = await Topic.findById(req.body.topic)

    if (!topic) return res.status(404).json({ message: 'invalid topid id provided' });

    const media = await Media.create({
        name: req.body.name,
        topic: req.body.topic,
        type: req.body.type,
        src: req.file.filename
    })

    await Topic.findByIdAndUpdate(req.body.topic,{$push: { media : media._id}})


    return res.json({ media, message: "created sussefully" })
})


module.exports = router;