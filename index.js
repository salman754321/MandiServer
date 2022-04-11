
const express=require("express")
require('dotenv').config()
const app=express();
var path = require("path")
const mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');
app.use("/uploads" , express.static('uploads'))
const bodyParser = require("body-parser");

var config = require('./config');
app.use(bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));

app.use(passport.initialize());
app.use(cors());

const url = config.mongoUrl;
const connect = mongoose.connect(url );

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });


let userRouter =require("./routes/users");


const { default: axios } = require("axios");

app.use("/users", userRouter);









const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Listning At Port ${port}`)

})