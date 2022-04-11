var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passPortLocalMongoose=require("passport-local-mongoose")

var User = new Schema({

    name: {
        type: String
      },
      cnic: {
        type: String,  
      },
      cnicpic:{
        type:[String]
      },
      mobilephone: {
        type: String,
        
      },
      walletAmount: {
        type: Number,
          default: 0,
      },
     
      email:{
        type:String,
      },
    role:  {
        type: String,
        default: "user"
    },
    status:{
      type:Boolean,
      default:true
    }
});

User.plugin(passPortLocalMongoose);
module.exports = mongoose.model('User', User);