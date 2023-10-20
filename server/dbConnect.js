const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config("./.env");

module.exports = () =>{
    const uri = process.env.DB_URL;

    try{
        mongoose.connect(uri);
        console.log("MongoDB connected");
    }
    catch(e){
        console.log(e);
    }
}