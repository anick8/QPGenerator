
var User = require('../models/User');
var asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

/*
exports.read = asyncHandler(async (req,res,next) => {

        var result = await user.findById(req.body.id)
        res.status(200).json({
            success:true,
            data:result
        })

    }), */   
exports.register = asyncHandler(async(req,res,next) => {
        
        
        var user = await User.create(req.body)
        let token = user.getsignedJWT();

        res.status(200).json({
            success:true,
            data:user,
            token

        })  

        
    }),
exports.login = asyncHandler(async(req,res,next) => {
        var {email,password} = req.body;
        if(!email || !password){
            return next(new ErrorResponse('Please provide email and password',400))
        }
        var user = await User.findOne({email}).select('+password');
         if(!user){
             return next(new ErrorResponse('Invalid credentials',401))
        }
        
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return next(new ErrorResponse('Invalid credentials',401))
        }
        let token = user.getsignedJWT();
        res.status(200).json({ success:true,
            data:user,
            token})
        
    }),
exports.logout = asyncHandler(async(req,res,next) => {

        var result = await user.findByIdAndDelete(req.body.id)
        res.status(200).json({
            success:true,   
            data:{}
        })
    })
//const sendTokenResponse = (user, statusCode, res) => {
    //let token = user.getSignedJWT();
    




