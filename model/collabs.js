import mongoose from 'mongoose'

const CollabSchema = mongoose.Schema

var Collab = new CollabSchema({
    title: {
        type: String,
        required: 'Title cannot be empty'
    },
    author: {
       type: CollabSchema.Types.ObjectId,
       ref: 'UserProfile' 
    },
    albumArt: {
        type: String
    }
})

module.exports = mongoose.model('collabs', Collab)