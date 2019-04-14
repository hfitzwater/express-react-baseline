let mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        unique: true,
    },
    profile: {
        type: Object,
    }
});

userSchema.statics.findOrCreate = function(profile, cb) {
    let context = this;
    // console.log( JSON.stringify(profile) );
    return new Promise(function(res, rej) {
        context.findOne({ googleId: profile.googleId }, function(err, user) {
            if( err ) {
                rej(err);
            }

            if( user ) {
                return res( user );
            } else {
                return context.create({ googleId: profile.googleId, profile: profile })
                    .then( user => {
                        res( user );
                    });
            }
        });
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;