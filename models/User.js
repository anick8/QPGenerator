var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    email: {
        type:String,
        required : [true,'Please add email'],
        unique: true,
    },
    age: {
        type: Number,
        default: 0,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false,
    },
    role:{
        type: String,
        enum: ['Jobcreater', 'Jobseeker'],
        default: 'user',

    }
})

userSchema.pre('save',async function (next)  {
    
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

userSchema.methods.getsignedJWT = function () {

            
            return jwt.sign({id:this._id},process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRES_IN
        })
} 

    
userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password,this.password)
}

module.exports = mongoose.model('User', userSchema)