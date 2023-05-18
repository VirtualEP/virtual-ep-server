const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    firstName: { type: String, required: true },

    lastName: { type: String, required: true },

    balance: { type: Number, required: true, default: 0 },

    country: { type: String, required: true },

    enrollment: { type: String, required: true, default: [] },

    email: { type: String, required: true },

    password: { type: String, required: true },

    accountType: { type: String, required: true, default: 'learner' },

    dateOfBirth: { type: Date, optional: true },

    createdAt: { type: Date, default: Date() },

});


const User = mongoose.model('User', UserSchema);


module.exports = { UserSchema, User }