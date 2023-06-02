const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({

    text: { type: String, required: true },

    isCorrect: { type: Boolean, required: true },

});

const QuestionSchema = new mongoose.Schema({

    question: { type: String, required: true },

    type: { type: String, required: true },

    upload: { type: String, required: false, default: '' },

    text: { type: String, required: false, default: '' },

    answers: [{ type: AnswerSchema }],

    createdAt: { type: Date, default: Date() },

});



const Question = mongoose.model('Question', QuestionSchema);


module.exports = { QuestionSchema, Question }