var express = require('express');
var {register,login,logout} = require('../controllers/user');
var {protect,authorize} = require('../middleware/auth');

const router = express.Router();
//module.exports = (app ,console) => {
//router.route('/read').post(read);
router.route('/register').post(register);
router.route('/login').post(login);
//router.route('/delete').post(protect,authorize('admin'),logout);

module.exports = router;  
//}
