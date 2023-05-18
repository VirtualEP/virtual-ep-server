const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({

    user: { type: String, required: true },

    course: { type: String, required: true },

    refrence: { type: String, required: true },

    refrence: { type: String, required: false, default: 'pending' },

    amount: { type: Number, required: true },

    createdAt: { type: Date, required: true, default: Date() },

});


const Purchase = mongoose.model('Purchase', PurchaseSchema);


module.exports = { PurchaseSchema, Purchase }