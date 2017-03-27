var mongoose = require('mongoose');

var schemaObj = {
    username: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    gravatarId: String
};

var userSchema = new mongoose.Schema(schemaObj, require('./defaultOptions'));

module.exports = mongoose.model('user', userSchema);
