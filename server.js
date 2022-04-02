const express = require('express');
const colors = require('colors');
const app = express();
var dotenv = require('dotenv');
var errorHandler = require('./middleware/error')

//const users = require('./app/User')
const jobs = require('./app/Question')

dotenv.config({ path: './config/config.env' });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//app.use('/api/v1/users', users);
app.use('/api/v1/question', jobs);

app.use(errorHandler);

PORT = process.env.PORT || 5000;
console.log(PORT)

var server = app.listen(PORT, () => {
        console.log(`server running at the port :${PORT}`.cyan.underline.bold);
});

