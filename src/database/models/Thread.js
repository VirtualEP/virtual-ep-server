const mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema({

    course: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Course' },

    author: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' },

    discription: { type: String, required: true },

    likes: [{ type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' }],

    dislikes: [{ type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' }],

    comments: [{ type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Comment' }],

    pinned: { type: Boolean, default: false, required: true },

    createdAt: { type: Date, default: Date() },

});


const Thread = mongoose.model('Thread', ThreadSchema);


module.exports = { ThreadSchema, Thread }