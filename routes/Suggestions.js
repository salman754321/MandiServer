var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');

router.use(bodyParser.json());

const { getAllSuggestions,addSuggestion , getSuggestionByuser } = require('../controller/SuggestionController');

router.get('/', authenticate.verifyUser , authenticate.verifyAdmin , getAllSuggestions);
router.post('/add', authenticate.verifyUser , addSuggestion);
router.post('/get', authenticate.verifyUser , getSuggestionByuser);


module.exports = router;