const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = mongoose.Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String
    },
    message: {
        type: String
    },
    deco: {
        type: Number
    }
}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema);

module.exports = { Post }