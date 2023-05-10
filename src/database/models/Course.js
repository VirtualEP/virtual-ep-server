const mongoose = require('mongoose');



const CourseSchema = new mongoose.Schema({

    title: { type: String, required: true },

    cover: { type: String, required: true },

    author: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' },

    threads: [{ type: mongoose.SchemaTypes.ObjectId, required: false, ref: 'Thread' }],

    tag: { type: [String], required: true, default: [] },

    discription: { type: String, required: false },

    stars: { type: Number, required: true, default: 1 },

    price: { type: Number, required: true, default: 120.00 },

    live: { type: Boolean, default: false, required: true },

    testimonials: [{ type: Object, required: true,default:[] }],

    students: [{ type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User",default:[] }],

    approved: { type: Boolean, required: true, default: false },

    createdAt: { type: Date, default: Date() },

});


const Course = mongoose.model('Course', CourseSchema);


module.exports = { CourseSchema, Course }