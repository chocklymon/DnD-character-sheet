var mongoose = require('mongoose');

var ability = {
    type: Number,
    min: 0,
    get: function(v) {
        return Math.round(v);
    },
    set: function(v) {
        return Math.round(v);
    }
};

// TODO Add sharing and owner fields, and remaining attributes
var schemaObj = {
    name: String,
    // owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    str: ability,
    dex: ability,
    con: ability,
    int: ability,
    wis: ability,
    chr: ability
};

var characterSchema = new mongoose.Schema(schemaObj, require('./defaultOptions'));

module.exports = mongoose.model('character', characterSchema);
