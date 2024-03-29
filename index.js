
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
app.use(express.json());
const url = config.mongoUrl;
const connect = mongoose.connect('mongodb+srv://agribazar:agribazar@cluster0.zrzbb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' , { useNewUrlParser:true , useUnifiedTopology:true} );

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });


let userRouter =require("./routes/users");
let categoryRouter =require("./routes/Category");
let complaintRouter =require("./routes/Complaints");
let suggestionRouter =require("./routes/Suggestions");
let offerRouter =require("./routes/Offer");
let reviewRouter  = require("./routes/Review");
let postsRouter =require("./routes/posts");
const { default: axios } = require("axios");

app.use("/users", userRouter);
app.use("/category", categoryRouter);
app.use("/complaints", complaintRouter);
app.use("/suggestions", suggestionRouter);
app.use("/categories", categoryRouter);
app.use("/posts", postsRouter);
app.use("/offers", offerRouter);
app.use("/reviews", reviewRouter);







app.get('/', (req, res) => {
  res.send('Hello World! from Agribazar');
});

var serverPort = 5000;

var port = process.env.PORT || serverPort;
app.listen(port,()=>{
    console.log(`Listning At Port ${port}`)
    

})