var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const { getAllReviews, getReviewsByUser, addReview } = require('../controller/ReviewController');

router.use(bodyParser.json());

router.get('/allReviews', authenticate.verifyUser , getAllReviews);
router.get('/byUser', authenticate.verifyUser , getReviewsByUser);
router.post('/add', authenticate.verifyUser, authenticate.verifyAdmin , addReview);