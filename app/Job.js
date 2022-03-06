var express = require('express');
var {create,read,update,deleteJob} = require('../controllers/Jobs');
var {protect,authorize} = require('../middleware/auth');

const router = express.Router();
//module.exports = (app ,console) => {
router.route('/createJob').post(protect,authorize('Jobcreater'),create);
router.route('/readJob').post(protect,authorize('Jobseeker','Jobcreater'),read);
router.route('/updateJob').post(protect,authorize('Jobcreater'),update);
router.route('/deleteJob').post(protect,authorize('Jobcreater'),deleteJob);

module.exports = router; 