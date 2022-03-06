const mongoose = require('mongoose');
const slugify = require('slugify');

const JobSchema = new mongoose.Schema(
  {
    Jobname: {
      type: String,
      required: [true, 'Please add a Job name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters']
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Description can not be more than 500 characters']
    },
    phone: {
      type: String,
      maxlength: [20, 'Phone number can not be longer than 20 characters']
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    user:{
      type:mongoose.Schema.ObjectId,
      ref:'User',
      required:true
    }

  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create bootcamp slug from the name
JobSchema.pre('save', function(next) {
  this.slug = slugify(this.Jobname, { lower: true });
  next();
});




module.exports = mongoose.model('JobSchema', JobSchema);