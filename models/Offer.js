// Offers  model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Offers = new Schema({
    Post: {
        type:Schema.Types.ObjectId,
        ref:'Post'
    },
    by: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    to: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    quantity:{
        type:Number,
        required:true
    },
    isAccepted:{
        type:Boolean,
        default:false
    }

}
);
module.exports = mongoose.model('Offers', Offers);
