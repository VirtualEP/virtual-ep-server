const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({

    thread: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Thread' },

    author: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' },

    discription: { type: String, required: true },

    likes: [{ type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' }],

    dislikes: [{ type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' }],

    pinned: { type: Boolean, default: false, required: true },

    createdAt: { type: Date, default: Date() },

});


const Comment = mongoose.model('Comment', CommentSchema);


module.exports = { CommentSchema, Comment }