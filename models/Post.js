// Post Schema
// --------------------------------------------------------------------------------


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");
var Post = new Schema({
    Product: {
        type: String,
        required: true
    },
    Category: {
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    Quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        default: 0
    }

});
module.exports = mongoose.model('Post', Post);