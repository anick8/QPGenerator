var asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
var pgsql = require('../lib/pgsql');
var hash = require('../lib/hash');
var {findSumCombo} = require('../lib/combinations');
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
        var Markdata ={}
        
        var TotalMarks = req.body.Marks; //Request Body Validation and Declaration
        var EasyPercentage = req.body.Difficulty.Easy;
        var MediumPercentage = req.body.Difficulty.Medium;
        var HardPercentage = req.body.Difficulty.Hard;
                                                        //Check if the sum of all the difficulty percentages is 100
        if(EasyPercentage + MediumPercentage + HardPercentage != 100) return next(new ErrorResponse(`Percentage sum should be 100`,404))
        if(TotalMarks == 0) return next(new ErrorResponse(`Total Marks should be greater than 0`,404))
         
        var MediumMarks = (MediumPercentage/100)*TotalMarks; //Calculating the marks for each difficulty level
        var HardMarks = (HardPercentage/100)*TotalMarks; 
        var EasyMarks = TotalMarks-(math.floor(MediumMarks)+math.floor(HardMarks)) //Preferentially selecting the easy questions
        var MarkType = {"Easy":EasyMarks,"Medium":MediumMarks,"Hard":HardMarks};

        
        for(difficulty in MarkType){   //Looping through the difficulty levels
            
            if(MarkType[difficulty] == 0) continue; //If the marks for a difficulty level is 0, skip it
            var Markslist =[];
            var qarg1 = [difficulty];//Selecting the questions based on the difficulty level
            var qname1 = `Select "QuestionUUID","Question","Marks","Difficulty" from "QuestionTable" where "Difficulty" = $1`;
            var result = await pgsql.execquery(qname1,qarg1,next)
            if(!result) return 
            if(result.rowCount == 0) return next(new ErrorResponse(`No Questions for Difficulty level - ${difficulty}`,500))
            

            for(item of result.rows) Markslist.push(item.Marks);//Iterate through the questions and add the marks to the list
            console.log("Markslist : ",Markslist)
    
            sumComboAndSum = findSumCombo(Markslist,MarkType[difficulty]); // Find the combination of marks that make up the total for each difficulty level ,f() => findSumCombo(Markslist,TotalMarks) 
            MarksDistribution = sumComboAndSum[0]; // The combination of marks that make up the total for each difficulty level
            Markdata[difficulty] = {'Totalquestions':MarksDistribution.length,'TotalMarks':sumComboAndSum[1]};
            var MarksDistribution = MarksDistribution.map(Number)
            
            for(Mark of MarksDistribution)for(item of result.rows){ //Map the values from the result set to the questions
                    if(item.Marks == Mark){
                        questions.push(item);
                        result.rows.splice(result.rows.indexOf(item),1)
                    }
                }
        }
        res.status(200).json({
            success:true,
            data:questions,   
            Markdata
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