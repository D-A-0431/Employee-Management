const User = require("../models/User");
const bcrypt = require("bcrypt");

const signupController = async(req,res)=>{
    try{
        const {email,password} = req.body;
        console.log(password);

        // if(!email || !password){
        //     return res.status(400).send("All fields are required");
        // }

        const oldUser = await User.findOne({email});
        if(oldUser){
            return res.status(400).json({Message:"failed"})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            email,
            password:hashedPassword
        });

        return res.status(201).json({
            user:user
        });

    } 
    catch(error) {
        console.log(error);
    }
}

const loginController = async(req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).send("All fields are required");
        }
        console.log(email);

        const user = await User.findOne({email});
        
        if(!user){
            return res.status(404).send("User is not registered");
        }

        const matched = await bcrypt.compare(password,user.password);
        if(!matched){
            return res.status(403).send("Incorrect Password");
        }

        return res.status(201).send("Logged in successfully");
    }
    catch(error){
        console.log(error);
    }
};

module.exports = {
    signupController,
    loginController,
}