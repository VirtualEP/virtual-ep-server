const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({

    title: { type: String, required: true },

    type: { type: String, required: true },

    length: { type: Number, required: true },

    course: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Course' },

    notes: [{ type: String, required: true }],

    createdAt: { type: Date, default: Date() },

});


const Lesson = mongoose.model('Lesson', LessonSchema);


module.exports = { LessonSchema, Lesson }