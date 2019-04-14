const express = require('express');
const router = express.Router();
const passport = require('../passport');

function loggedIn( req, res, next ) {
    if( req.user ) {
        console.log( req.user.firstName );
        next();
    } else {
        res.status(403).send('Unauthorized');
    }
};

router.get('/v1/hello', loggedIn, function(req, res) {
    const name = req.user.firstName;
    res.json({
        message: `Hello ${name}` 
    });
});

module.exports = router;