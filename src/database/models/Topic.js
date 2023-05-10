const mongoose = require('mongoose');


const TopicSchema = new mongoose.Schema({

    title: { type: String, required: true },

    discription: { type: String, required: false, default:''},

    course: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Course' },

    media: { type: [mongoose.SchemaTypes.ObjectId], required: true, ref: 'Media',default:[] },

    createdAt: { type: Date, default: Date() },

});



const Topic = mongoose.model('Topic', TopicSchema);


module.exports = { TopicSchema, Topic }