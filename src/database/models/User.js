const mongoose = require('mongoose');

const securitySchema = new mongoose.Schema({
    emailFa: { type: Boolean, require: true, default: false },
    phoneFa: { type: Boolean, require: true, default: false },
})

const UserSchema = new mongoose.Schema({

    firstName: { type: String, required: true },

    lastName: { type: String, required: true },

    phoneNumber: { type: String, required: false },

    balance: { type: Number, required: true, default: 0 },

    country: { type: String, required: true },

    enrollment: { type: [String], required: true, default: [] },

    securityOption: { type: securitySchema, required: false },

    verificationToken: { type: String, required: true },

    email: { type: String, required: true },

    isVerified: { type: Boolean, required: true, default: false },

    password: { type: String, required: true },

    accountType: { type: String, required: true, default: 'learner' },

    dateOfBirth: { type: Date, optional: true },

    createdAt: { type: Date, default: Date() },

});


const User = mongoose.model('User', UserSchema);


module.exports = { UserSchema, User }