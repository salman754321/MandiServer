var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passPortLocalMongoose=require("passport-local-mongoose")

var User = new Schema({

    name: {
        type: String
      },
      mobilephone: {
        type: String,
        
      },
      otp:{
        type:Number,
        default:1234,
        max:9999,
      },
     
      email:{
        type:String,
      },
    role:  {
        type: String,
        default: "user"
    },
    location:{

        type:String
    },
    status:{
      type:Boolean,
      default:false
    }
});

User.plugin(passPortLocalMongoose);
module.exports = mongoose.model('User', User);