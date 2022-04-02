var express = require('express');
var {getQuestionPaper,insertQuestion} =  require('../controllers/question');
var {protect,authorize} = require('../middleware/auth');

const router = express.Router();
//module.exports = (app ,console) => {
router.route('/insertQuestion').post(insertQuestion); //protect,authorize('QuestionCreater'),
router.route('/getQuestionPaper').post(getQuestionPaper); //protect,authorize('QPcreater','QuestionCreater'),
//router.route('/updateQuestion').post(protect,authorize('QuestionCreater'),update);
//router.route('/deleteQuestion').post(protect,authorize('QuestionCreater'),deleteQuestion);

module.exports = router; 