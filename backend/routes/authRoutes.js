const express=require("express");
const router=express.Router();
const jwt = require("jsonwebtoken");
const User=require("../models/User");
const bcrypt = require("bcrypt");

router.post("/signup",async (req,res)=>{
    try{
        const {name,email,password,role,skills}=req.body;
        if(!email || !name || !password ||!role){
        return res.status(400).json({message:"Enter Required Credntials"});
        }
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(409).json({message:"User exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser = await User.create({name,email,password: hashedPassword,role,skills});
        
        const token=jwt.sign({ userId: newUser._id, role: newUser.role},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );
        return res.status(201).json({message:"User created",token,user:{userId:newUser._id, role:newUser.role}});
        }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"});
    }
});

router.post("/login",async (req,res)=>{
    try{
        const {email,password}=req.body;
        const existingUser=await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({message:"User Not Found!"});
        }
        const isMatch=await bcrypt.compare(password,existingUser.password);
        if(!isMatch){
            return res.status(401).json({message:"Wrong Credentials"});
        }
        const token=jwt.sign({ userId: existingUser._id, role: existingUser.role},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );
        return res.status(200).json({message:"Login Successful",token,user:{userId:existingUser._id, role:existingUser.role}});
    }
    catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
})
module.exports = router;

