const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({

    title: { type: String, required: true },

    type: { type: String, required: true },

    length: { type: Number, required: true },

    course: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Course' },

    notes: [{ type: String, required: true }],

    createdAt: { type: Date, default: Date() },

});


const Exercise = mongoose.model('Exercise', ExerciseSchema);


module.exports = { ExerciseSchema, Exercise }