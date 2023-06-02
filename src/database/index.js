const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

async function connectDatabase() {
    await mongoose.connect(process.env.DATABASE_URI);
}

module.exports = connectDatabase ;