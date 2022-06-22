var User = require('../models/user');
var passport = require('passport');
var authenticate=require("../authenticate");
const getuser = require('../utils/user');
const bcrypt = require('bcrypt')

let getAllUsers =(req, res, next) => {
    User.find({}, (err, users) => {
      if (err) {
        return next(err);
      } else {
        res.statusCode = 200;
        
        res.setHeader('Content_type', 'application/json');
        res.json({users:users, success:true});
      }
    })
  }

let signup = (req, res, next) => {
console.log(req.body)
    User.register(new User({username: req.body.email}), 
      req.body.password, (err, user) => {
      if(err) {
        console.log(err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
      }
      else {
          user.name = req.body.name;
          user.location = req.body.location;
          user.mobilephone = req.body.mobilephone;
          user.email = req.body.email;
          
        user.save((err, user) => {
          if (err) {
            console.log(err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({success:false , err: err});
          }
          passport.authenticate('jwtPassport')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Registration Successful!'});
            console.log(user)

          });
        });
      }
    });
  }

  let login =  (req, res , next) => {
    passport.authenticate('local' , (err , user ,info)=>{
        if(err){
          return next(err)
        }if(!user){
          console.log(1)
          res.json({msg:"Username or Password Incorrect"})
        }else{
       
        req.logIn(user, function(err) {
          if (err) {
            return next(err);
          }else{
            console.log(req.user)
            if(!req.user.status){
              res.json({success:false , msg:"You Are Blocked from using this app"})
            }else{
        var token=authenticate.getToken({_id:req.user._id})
        let user = req.user;
   
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        let usr = getuser(user)
        res.json({success: true,token:token, user:usr, status: 'You are successfully logged in!'});
            }
      }})
    }
    
 })(req,res,next)};
 





   

    let updatedUser = async(req , res)=>{

      await User.findById(req.user._id , (err ,user)=>{
        if(err){
          res.json(err)
        }else{
          res.json({success:true , user:user})
        }
      })
    }
    let logout =(req, res) => {
        if (req.session) {
          req.session.destroy();
          res.clearCookie('session-id');
          res.redirect('/');
        }
        else {
          var err = new Error('You are not logged in!');
          err.status = 403;
          next(err);
        }
      }

      
let blockUser = async(req ,res, next)=>{
  await  User.findById(req.body.id, (err, user)=>{
    if(!err){
      user.status=!user.status;
      user.save();
      res.json({status:true})
    }else{
      res.json({err:err});
    }
  });
}
      let changepassword = async(req , res , next)=>{
        let op= req.body.op;
        let p1= req.body.p1;
        let id = req.user._id;
      
          await  User.findById(id, (err, user)=>{
            if(!err){
              user.changePassword(op,p1 , (err , user)=>{
                if(!err){
                  res.json({success:true , message:"Passowrd Changed Successfully"});
                }else{
                  res.json({success:false , message:"Incorrect Old password"})
                }
              });
              
              
        }else{
            res.json({err:err})
        }
      });
    }

  let verifyUser = async(req , res , next)=>{
    
   // find user bey email
    await User.findOne({email:req.body.email}, (err, user)=>{
      if(!err){
        if(req.body.otp==user.otp){
        user.status=true;
        user.save();
        res.json({success:true , message:"User Verified Successfully"});
        }
        else{
          res.json({success:false , message:"Incorrect OTP"})
        }
      }else{
        res.json({err:err});
      }
    });
  }

  module.exports = {
      getAllUsers,
      signup,
      login,
      logout,
      changepassword,
      blockUser,
      updatedUser,
      verifyUser

  }
