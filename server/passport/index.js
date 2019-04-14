const passport = require('passport');
const GoogleStratgey = require('./googleStrategy');
const User = require('../db/models/user');

passport.serializeUser((user, done) => {
	done(null, {
        _id: user._id
    });
})

passport.deserializeUser((id, done) => {
	User.findOne(
		{ _id: id },
		'firstName lastName email photos',
		(err, user) => {
			done(null, user);
		}
	);
});

passport.use(GoogleStratgey);

module.exports = passport;
