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

    console.log(req.body);

    if ((req.body.topic === '' && req.body.topicId === '') || (req.body.course === '')) {
        return res.status(404).json({ message: 'invalid topid id provided' });
    }

    let topic = null;
    let topicUpdated = false;

    if (req.body.topicId !== '') {

        topic = await Topic.findById(req.body.topicId)

        if (!topic) return res.status(404).json({ message: 'invalid topid id provided' });
    }

    if (req.body.topic !== '' && req.body.topicId === '') {
        topic = await Topic.create({
            course: req.body.course,
            title: req.body.topic,
        })
         topicUpdated = true;
    }

    const media = await Media.create({
        name: req.body.name,
        topic: topic._id,
        type: req.body.type,
        src: req.file.filename,
        size: req.file.size
    })

    await Topic.findByIdAndUpdate(topic._id, { $push: { media: media._id } })


    return res.json({ topic: { data: topic, topicUpdated }, media, message: "created sussefully" })
})


module.exports = router;