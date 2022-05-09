var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const upload = require('../utils/uploader');
router.use(bodyParser.json());
const {getAllCategory ,addCategory , deleteCategory}  = require('../controller/CategoryController');

// onlu loggedin users can access this fincion getAllCategory
router.get('/', authenticate.verifyUser , getAllCategory);
// only admin can access this function addCategory
router.post('/add', authenticate.verifyUser, authenticate.verifyAdmin ,upload.single('image')  ,addCategory);


router.delete('/delete/:id', authenticate.verifyUser, authenticate.verifyAdmin ,deleteCategory);

module.exports = router;