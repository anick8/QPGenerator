var asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
var pgsql = require('../lib/pgsql');
var hash = require('../lib/hash');
var {findSumCombo} = require('../lib/sublist');
var math = require('math');


exports.insertQuestion = asyncHandler(async (req,res,next) => {
        var Ts = Date.now();     
        var QuestionUUID = hash.hashing(Ts); //Generate UUID for each question
        var qarg3 =  [QuestionUUID,req.body.Question,req.body.Subject,req.body.Topic,req.body.Marks,req.body.Difficulty];     
        var qname3 = 'Insert into "QuestionTable" ("QuestionUUID","Question","Subject","Topic","Marks","Difficulty") values($1,$2,$3,$4,$5,$6)'
        var result = await pgsql.execquery(qname3,qarg3,next) // Insert question into QuestionTable
        if(!result) return 
        if(result.rowCount == 0) return next(new ErrorResponse(`Unable to insert`,500))
        
        res.status(200).json({
            success:true,
            data:{QuestionUUID}
        })
    })  

exports.getQuestionPaper = asyncHandler(async(req,res,next) => {
        var questions = [];
        
        var TotalMarks = req.body.Marks; //Request Body Validation and Declaration
        var EasyPercentage = req.body.Difficulty.Easy;
        var MediumPercentage = req.body.Difficulty.Medium;
        var HardPercentage = req.body.Difficulty.Hard;
                                                        //Check if the sum of all the difficulty percentages is 100
        if(EasyPercentage + MediumPercentage + HardPercentage != 100) return next(new ErrorResponse(`Percentage sum should be 100`,404))
        
         
        var MediumMarks = (MediumPercentage/100)*TotalMarks; //Calculating the marks for each difficulty level
        var HardMarks = (HardPercentage/100)*TotalMarks; 
        var EasyMarks = TotalMarks-(math.floor(MediumMarks)+math.floor(HardMarks)) //Preferentially selecting the easy questions
        var MarkType = {"Easy":EasyMarks,"Medium":MediumMarks,"Hard":HardMarks};
        
        for(difficulty in MarkType){   //Looping through the difficulty levels
            
            
            var Markslist =[];
            var qarg1 = [difficulty];//Selecting the questions based on the difficulty level
            var qname1 = `Select "QuestionUUID","Question","Marks","Difficulty" from "QuestionTable" where "Difficulty" = $1`;
            var result = await pgsql.execquery(qname1,qarg1,next)
            if(!result) return 
            if(result.rowCount == 0) return next(new ErrorResponse(`No Questions for Difficulty level - ${difficulty}`,500))
            
            
            for(item of result.rows) Markslist.push(item.Marks);//Iterate through the questions and add the marks to the list
        
            MarksDistribution = findSumCombo(Markslist,MarkType[difficulty]); // Find the combination of marks that make up the total for each difficulty level ,f() => findSumCombo(Markslist,TotalMarks)
    
            var MarksDistribution = MarksDistribution.map(Number)
            for(item of result.rows){ //Iterate through the questions and add them to the final list
                MarksDistribution.filter(element=>parseInt(element)==parseInt(item.Marks)).map(element=>{questions.push(item)
                MarksDistribution.splice(MarksDistribution.indexOf(parseInt(element)),1)})
            }
        }
        res.status(200).json({
            success:true,
            data:questions,   
            MarkType
        })  

        
})
/*exports.update = asyncHandler(async(req,res,next) => {
   
    

    res.status(200).json({
        success:true,
        data:Job,
        

    })  

    
})
exports.deleteQuestion = asyncHandler(async(req,res,next) => {
   
    

    res.status(200).json({
        success:true,
        data:{},

    })  

    
})

*/