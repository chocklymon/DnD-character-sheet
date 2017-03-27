var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Characters = mongoose.model('character');

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
    // TODO
    res.send('Update Character');
});

/* Delete a character */
router.delete('/:id', function(req, res, next) {
    // TODO
    res.send('Delete Character');
});

module.exports = router;
