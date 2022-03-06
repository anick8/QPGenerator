const mongoose = require('mongoose');
  

const connectdb = async () => {
    try {
    const connection = await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${connection.connection.host}`);
    }
    catch(err) {
        console.log(err);
    }
}
module.exports = connectdb;