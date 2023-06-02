const mongoose = require('mongoose');


const MediaSchema = new mongoose.Schema({

    name: { type: String, required: true },

    type: { type: String, required: true },

    src: { type: String, required: true },

    length: { type: Number, required: false },

    topic: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Topic' },

    notes: [{ type: Object, required: true, default: [] }],

    createdAt: { type: Date, default: Date() },

});


const Media = mongoose.model('Media', MediaSchema);


module.exports = { MediaSchema, Media }