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
      mobilephone: {
        type: String,
        
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
      default:true
    }
});

User.plugin(passPortLocalMongoose);
module.exports = mongoose.model('User', User);