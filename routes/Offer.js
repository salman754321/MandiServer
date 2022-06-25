var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');

router.use(bodyParser.json());

let {getAllOffers , giveoffer} = require('../controller/OfferControler');
router.get('/alloffers', authenticate.verifyUser , getAllOffers);
router.post('/sendoffer', authenticate.verifyUser , giveoffer);

module.exports = router;