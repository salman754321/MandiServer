var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const upload = require('../utils/uploader'  );
router.use(bodyParser.json());
const {getAllCategory ,addCategory , deleteCategory , getCategoryById , editCategory}  = require('../controller/CategoryController');

// onlu loggedin users can access this fincion getAllCategory   
router.get('/', authenticate.verifyUser , getAllCategory);
// only admin can access this function addCategory
router.post('/add', authenticate.verifyUser, authenticate.verifyAdmin ,upload.single('image')  ,addCategory);

router.post('/edit/:id' , authenticate.verifyUser , authenticate.verifyAdmin , upload.single('image') , editCategory);
router.delete('/delete/:id', authenticate.verifyUser, authenticate.verifyAdmin ,deleteCategory);

router.get('/:id', authenticate.verifyUser , getCategoryById);

module.exports = router;