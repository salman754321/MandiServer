// Category Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");
var Category = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    subCategory: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    bazar:{
        type: String,
        required: true

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Category', Category);