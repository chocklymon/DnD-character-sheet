var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Characters = mongoose.model('character');

var _forEach = require('lodash/forEach');

/* Get all characters */
router.get('/', function(req, res) {
    // TODO get all characters for the user
    Characters.find({}).exec()
        .then(function(characterList) {
            res.send(characterList);
        })
        .catch(function(e) {
            // TODO unified error handling. i.e., errors will always have a standard format.
            console.warn(e);
            res.status(500).send('ERROR');
        });
});

/* Add a character */
router.post('/', function(req, res) {
    Characters.create(req.body)
        .then(function(createdCharacter) {
            res.status(201).send(createdCharacter);
        })
        .catch({name: 'ValidationError'}, function(e) {
            console.log('ValidationError', e);
            res.status(400).send(e);
        })
        .catch(function(e) {
            console.warn('Unhandled Exception', e);
            res.status(500).send(e);
        });
});

/* Get a specific character */
router.get('/:id', function(req, res, next) {
    // TODO make sure the user can view this character
    Characters.findById(req.params.id).exec()
        .then(function(character) {
            if (character) {
                res.send(character);
            } else {
                res.status(404).send({'error': 'Not Found'});
            }
        })
        .catch(function(err) {
            console.warn('Unhandled Exception', err);
            res.status(500).send(err);
        });
});

/* Update a character */
router.post('/:id', function(req, res, next) {
    // TODO check that they have permission to update
    Characters.findById(req.params.id).exec()
        .then(function(character) {
            if (character) {
                // Update the character from what was posted in
                _forEach(req.body, function(value, key) {
                    // Ignore keys that start with an underscore
                    if (key && key.length >= 1 && key[0] !== '_') {
                        character[key] = value;
                    }
                });
                return character.save()
                    .then(function(c) {
                        res.send(c);
                    });
            } else {
                res.status(404).send({'error': 'Not Found'});
            }
        })
        .catch(function(err) {
            console.warn('Update Character Error', err);
            res.status(500).send(err);
        });
});

/* Delete a character */
router.delete('/:id', function(req, res, next) {
    // TODO check that they haver permission to delete
    Characters.findByIdAndRemove(req.params.id).exec()
        .then(function(deletedCharacter) {
            console.log('Deleted:', deletedCharacter);
            res.send({'success': true});
        })
        .catch(function(err) {
            console.warn(err);
            res.status(500).send(err);
        })
});

module.exports = router;
