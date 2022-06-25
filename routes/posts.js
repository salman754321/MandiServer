var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');

router.use(bodyParser.json());

const { getAllPosts ,getAllPostsByCategory ,getAllPostsByUser ,getPostById,getPostByMachinery , getPostBySeeds,getPostByAgriBazar, ApprovePost , addPost } = require('../controller/PostController');
// onlu loggedin users can access this fincion getAllComplaints
router.get('/', authenticate.verifyUser , getAllPosts);
router.post('/add', authenticate.verifyUser , addPost);
router.post('/approve/:id', authenticate.verifyUser , ApprovePost);
router.get('/agribazar' , authenticate.verifyUser ,getPostByAgriBazar )
router.get('/machinery' , authenticate.verifyUser ,getPostByMachinery )
router.get('/seed' , authenticate.verifyUser ,getPostBySeeds )
router.get('/byid' , authenticate.verifyUser ,getPostById )




module.exports = router;