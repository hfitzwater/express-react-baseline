const express = require('express');
const router = express.Router();
const passport = require('../passport');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URI}/login` }), 
    function(req, res) {
        res.redirect( process.env.CLIENT_URI );
    });

router.get('/user', (req, res, next) => {
	if (req.user) {
		return res.json({
            user: req.user
        });
	} else {
		return res.json({
            user: null
        });
	}
});

router.post('/logout', (req, res) => {
	if( req.user ) {
		req.session.destroy();
		res.clearCookie('connect.sid');
		return res.json({
            msg: 'logging out'
        });
	} else {
		return res.json({
            msg: 'nobody to logout'
        });
	}
});

module.exports = router
