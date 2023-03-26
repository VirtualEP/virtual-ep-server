const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({

    title: { type: String, required: true },

    cover: { type: String, required: true },

    author: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' },

    threads: [{ type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Thread' }],

    discription: { type: String, required: true },

    stars: { type: Number, required: true, default: 1 },

    live: { type: Boolean, default: false, required: true },

    ratinigs: [{ type: Object, required: true }],

    lessons: [{ type: String, required: true }],

    students: [{ type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User" }],

    approved: { type: Boolean, required: true, default: false },

    createdAt: { type: Date, default: Date() },

});


const Course = mongoose.model('Course', CourseSchema);


module.exports = { CourseSchema, Course }