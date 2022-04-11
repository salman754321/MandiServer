var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStragety=require('passport-jwt').Strategy;
var extractJwt=require('passport-jwt').ExtractJwt;
var jwt=require("jsonwebtoken");
var config=require("./config");

require('dotenv').config()
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken=function(user){
    return jwt.sign(user,process.env.SECRET_KEY,
        {expiresIn:360000})
};

var opts = {};
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=process.env.SECRET_KEY;
exports.jwtPassport=passport.use(new JwtStragety(opts,
    (jwt_payload,done)=>{
        User.findOne({_id:jwt_payload._id},(err,user)=>{
            if(err){
                return done(err,false);
            }
            else if(user){
                return done(null,user);
            }else{
                return done(null,false);
            }
        });
    }));

    exports.verifyUser = passport.authenticate('jwt',{session:false});

    exports.verifyAdmin = function (req, res, next) {
        if (req.user.role=="admin") {
            next();
        } else {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }
    }