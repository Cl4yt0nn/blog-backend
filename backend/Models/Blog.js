const mongoose = require('mongoose');
const blogSchema = mongoose.Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    description: {
        type: String,
    },
    text: {
        type: String,
    },
    imageURL: {
        type: String,
    },
}, {
    collection: 'posts',
})

module.exports = mongoose.model('post', blogSchema)