const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.promise = Promise;

// Define userSchema
const userSchema = new Schema({
	firstName: {
        type: String,
        unique: false
    },
	lastName: {
        type: String,
        unique: false
    },
    email: {
        type: String,
        unique: true
    },
	local: {
		username: { 
            type: String,
            unique: false, 
            required: false
        },
		password: {
            type: String,
            unique: false,
            required: false
        }
	},
	google: {
		googleId: {
            type: String,
            required: false
        }
	},
	photos: []
});

const User = mongoose.model('User', userSchema);

module.exports = User;
