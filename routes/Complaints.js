var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');

router.use(bodyParser.json());


const { getAllComplaints ,addComplaint , ResolveComplaint }  = require('../controller/ComplaintsController');
// onlu loggedin users can access this fincion getAllComplaints
router.get('/', authenticate.verifyUser , getAllComplaints);
// only admin can access this function addComplaint
router.post('/add', authenticate.verifyUser , addComplaint);
// only admin can access this function ResolveComplaint
router.post('/resolve', authenticate.verifyUser, authenticate.verifyAdmin , ResolveComplaint);


module.exports = router;