const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Creating the model and exporting
const userModel = mongoose.model('users', usersSchema);
module.exports = userModel;