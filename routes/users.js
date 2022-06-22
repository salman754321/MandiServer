var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate=require("../authenticate");
const { getAllUsers ,signup , login , logout , changepassword , blockUser , updatedUser ,verifyUser} = require('../controller/userController');
router.use(bodyParser.json());
/* GET users listing. */
router.get('/', authenticate.verifyUser , authenticate.verifyAdmin, getAllUsers ,);
router.post('/signup', signup);


router.post('/login',login);


router.post("/blockuser" ,authenticate.verifyUser,  blockUser )

router.post("/changepassword" ,authenticate.verifyUser , changepassword )
router.get("/updateduser" , authenticate.verifyUser , updatedUser)
router.get('/logout',authenticate.verifyUser, logout);
router.post('/verifyuser', verifyUser);

module.exports = router;
