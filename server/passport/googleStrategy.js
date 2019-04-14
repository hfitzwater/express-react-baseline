const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../db/models/user');

const strategy = new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: '/auth/google/callback'
	},
	function(token, tokenSecret, profile, done) {
		const { id, name, photos, _json } = profile;

		User.findOne({ 'google.googleId': id }, (err, userMatch) => {
			if (err) return done(err, false)
			if (userMatch) {
                return done(null, userMatch);
            }
				
            const newGoogleUser = new User({
                'google.googleId': id,
                firstName: name.givenName,
                lastName: name.familyName,
                email: _json.email,
                photos: photos
            });

            newGoogleUser.save((err, savedUser) => {
                if (err) {
                    return done(err, false);
                } else {
                    return done(null, savedUser);
                }
            });
		});
	}
);

module.exports = strategy;
