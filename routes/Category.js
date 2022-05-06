var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');

router.use(bodyParser.json());
const {getAllCategory ,addCategory }  = require('../controller/CategoryController');

// onlu loggedin users can access this fincion getAllCategory
router.get('/', authenticate.verifyUser , getAllCategory);
// only admin can access this function addCategory
router.post('/add', authenticate.verifyUser, authenticate.verifyAdmin , addCategory);


module.exports = router;