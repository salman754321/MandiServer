// Category Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Review = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
}
}

);
module.exports = mongoose.model('Review', Review);
