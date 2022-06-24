// Complains model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Complaints = new Schema({
    Post: {
        type:Schema.Types.ObjectId,
        ref:'Post'
    },
    description: {
        type: String,
        required: true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    
    status:{
        type:String,
        default:"pending"
    }
}
);
module.exports = mongoose.model('Complaints', Complaints);
