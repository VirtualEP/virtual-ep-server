const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({

    to: { type: String, required: true },

    from: { type: String, required: true, default: 'iLearn' },

    content : { type: String, required: true},

    refrence: { type: String, required: false },

    data: { type: Object, required: false },

    createdAt: { type: Date, required: true, default: Date() },

});


const Notification = mongoose.model('Notification', NotificationSchema);


module.exports = { NotificationSchema, Notification }