const express=require("express");
const authMiddleware=require("../middlewares/middleware");
const Job=require("../models/Job");
const User=require("../models/User");


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

router.get("/postings", authMiddleware, async (req, res) => {
    try {
        console.log(req.user.userId);
        const user = await User.findById(req.user.userId);
        const userSkills = user.skills || [];
        console.log(userSkills);
        const jobs = await Job.find().sort({ createdAt: -1 }); // fetch all jobs

        // compute matchScore, matchedSkills, missedSkills for each job dynamically
        const jobsWithScores = jobs.map(job => {
            const matched = [];
            const missed = [];

            for (let skill of job.reqSkills) {
                if (userSkills.includes(skill)) matched.push(skill);
                else missed.push(skill);
            }

            const score = (matched.length / job.reqSkills.length) * 100;

            // convert mongoose doc to plain object and attach dynamic fields
            return {
                ...job.toObject(),
                matchScore: score.toFixed(2),
                matchedSkills: matched,
                missedSkills: missed
            };
        });

        return res.status(200).json({ jobs: jobsWithScores }); // send all jobs

    } catch (err) {
        console.error(err); // log actual error to debug
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// router.get("/recommended",authMiddleware,async (req,res)=>{
//     try{
//         const userSkills=req.user.skills;
//         const 
//     }
// })

module.exports=router;
