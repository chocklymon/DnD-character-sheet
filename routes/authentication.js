var express = require('express');
var router = express.Router();

var _merge = require('lodash/merge');

var refreshCookieOptions = {
    httpOnly: true,
    path: '/v1/login/refresh',
    secure: true,
    signed: true
};

/* Login a user */
router.post('/login', function(req, res, next) {
    // TODO implement
    res.send('login');
    if (req.body.stayLoggedIn) {
        // The user wants to stay logged in
        // Create a refresh token to use with the refresh endpoint and store it with the authorized applications
        // for the user.
        var expiry = new Date();
        expiry.setYear(expiry.getYear() + 10);
        var cookieOptions = _merge({'expires': expiry}, refreshCookieOptions);
        res.cookie('_rt', 'SOMEREFRESHTOKEN', cookieOptions);
    }
    res.send({'token': 'SOME TOKEN'})
});

router.get('/logout', function(req, res, next) {
    // TODO unset the refresh cookie and remove it from the authorized applications
    res.clearCookie('_rt', refreshCookieOptions);
    res.send('Logged out');
});

/* Refresh a logged in user */
router.get('/refresh', function(req, res, next) {
    // TODO check req.signedCookies
    res.send('refresh');
});

module.exports = router;
