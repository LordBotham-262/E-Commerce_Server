const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() =>{
try{
    await  mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

}catch(error){
    console.error("MongoDB connection FAIL");
    process.exit(1);
}}

module.exports = connectDB;