var pg = require('pg');
var dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

var config = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: process.env.POSTGRES_PORT,
  //connectionString:'postgres://vzcexrgllbfpwg:1a6b31281e49b445b1c19e2fa23dc2ea345e7da7211d4b16a7a2a5215acf227b@ec2-52-0-93-3.compute-1.amazonaws.com:5432/d1mssicitt3s3v',
  //ssl: { rejectUnauthorized: false }
}


var execquery = async (qname,qargs,next) => {
  const pool = new pg.Pool(config)  
  try{
    var client = await pool.connect()
    return await client.query(qname,qargs)
  }
  catch(e){
    next(e)
  }
  finally{
    console.log("Connection Closed")
    client.release();
  }
};

exports.execquery = execquery;