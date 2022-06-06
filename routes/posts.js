var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');

router.use(bodyParser.json());

const { getAllPosts ,getAllPostsByCategory ,getAllPostsByUser ,getPostById, ApprovePost , addPost } = require('../controller/PostController');
// onlu loggedin users can access this fincion getAllComplaints
router.get('/', authenticate.verifyUser , getAllPosts);
router.post('/add', authenticate.verifyUser , addPost);
router.post('/approve/:id', authenticate.verifyUser , ApprovePost);




module.exports = router;