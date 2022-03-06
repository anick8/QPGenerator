var JobSchema = require('../models/Job');
var asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');


exports.read = asyncHandler(async (req,res,next) => {
        if(req.user.role !== 'Jobseeker'){
         return next(new ErrorResponse('Not authorized',401))   
        }

        var Job = await JobSchema.findById(req.body.id)
        if(!Job) return next(new ErrorResponse(`Job not found with id ${req.body.id} `,404))

        res.status(200).json({
            success:true,
            data:Job
        })
    })  
exports.create = asyncHandler(async(req,res,next) => {
        req.body.user = req.user.id;
        
        if(req.user.role != 'Jobcreater'){
            return next(new ErrorResponse('Not authorized to create a Job',401))
        }

        var Job = await JobSchema.create(req.body)
        res.status(200).json({
            success:true,
            data:Job,
        })  

        
    }),
exports.update = asyncHandler(async(req,res,next) => {
    var Job = await JobSchema.findById(req.body.id)     
    if(!Job) return next(new ErrorResponse(`Job not found with id ${req.body.id} `,404))
    


    if(req.user.role != 'Jobcreater' || req.user.id != Job.user.toString()){
        return next(new ErrorResponse('Not authorized to update a Job',401))    
    }
    var Job = await JobSchema.findByIdAndUpdate(req.body.id,req.body,{
        new:true,
        runValidators:true
    })
    

    res.status(200).json({
        success:true,
        data:Job,
        

    })  

    
})
exports.deleteJob = asyncHandler(async(req,res,next) => {
    var Job = await JobSchema.findById(req.body.id)    
    if(!Job) return next(new ErrorResponse(`Job not found with id ${req.body.id} `,404))

    if(req.user.role != 'Jobcreater' || req.user.id != Job.user.toString()){
     return next(new ErrorResponse('Not authorized to delete a Job',401))
    }
    var Job = await Job.remove()
    

    res.status(200).json({
        success:true,
        data:{},

    })  

    
})

