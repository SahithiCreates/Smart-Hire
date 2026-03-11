const express=require("express");
const authMiddleware=require("../middlewares/middleware");
const Job=require("../models/Job");

const router = express.Router();

router.post("/postJob", authMiddleware,async(req,res)=>{
    try{
        const {title,company,type,stipend,location,description,reqSkills}=req.body;
        if(!title || !company ||!type ||!stipend ||!location ||!description||!reqSkills){
            return res.status(400).json({message :"Enter required Fields"});
        }
        await Job.create({title,company,type,stipend,location,description,reqSkills,recruiterId: req.user.userId});
        return res.status(201).json({message:"Job created!"});
    }
    catch(err){
    console.log(err);
        return res.status(500).json({message:"Internal server error"});
    }
});

router.get("/postings",authMiddleware,async (req,res)=>{
    try{
        const jobs = await Job.find().sort({ createdAt: -1 });
        return res.status(200).json({jobs});
    }
    catch(err){
        return res.status(500).json({message:"Internal server Error"});
    }
});

module.exports=router;
