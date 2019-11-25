const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    handle: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pokemon: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('users', UserSchema);
module.exports = User;