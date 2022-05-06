// Suggestion model


var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SuggestionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Suggestion', SuggestionSchema);