import mongoose from 'mongoose'

const ProfileSchema = mongoose.Schema

var UserProfile = new ProfileSchema({
    email: {
        type: String,
        required: 'Enter valid email address.'
    },
    password: {
        type: String,
        required: 'Enter valid password.'
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    addressLine: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },

});

module.exports = mongoose.model('UserProfile', UserProfile)