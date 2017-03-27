var mongoose = require('mongoose');

var attribute = {
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
    str: attribute,
    dex: attribute,
    con: attribute,
    int: attribute,
    wis: attribute,
    chr: attribute
};

var characterSchema = new mongoose.Schema(schemaObj, require('./defaultOptions'));

module.exports = mongoose.model('character', characterSchema);
