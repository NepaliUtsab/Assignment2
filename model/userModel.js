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
    }
});

module.exports = mongoose.model('UserProfile', UserProfile)