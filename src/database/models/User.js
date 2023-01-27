const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    firstName: String,

    lastName: String,

    country: String,

    email: String,
    
    password: String,

    dateOfBirth: { type: Date, optional: true },

    createdAt: { type: Date, default: Date() },

});


const User = mongoose.model('User', UserSchema);


module.exports = { UserSchema, User }