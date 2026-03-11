const express=require("express");
const Application=require("../models/Application");
const authMiddleware=require("../middlewares/middleware");
const Job=require("../models/Job");

const router = express.Router();

router.get("/myApplications", authMiddleware, async (req,res)=>{
    try{
        const userId = req.user.userId;

        const applications = await Application
            .find({ userId })
            .populate("jobId");
        return res.status(200).json({applications});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server Error"});
    }
});

// router.get("/jobs/:jobId", authMiddleware, async (req, res) => {
//   try {
//     const { jobId } = req.params;

//     // Check if job exists
//     const job = await Job.findById(jobId);
//     if (!job) return res.status(404).json({ message: "Job not found" });

//     // Check if the logged-in recruiter owns this job
//     if (job.recruiterId.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Forbidden" });
//     }

//     const applicants = await Application.find({ jobId })
//       .populate("userId", "name email")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({ applicants });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// });

router.post("/apply",authMiddleware,async (req,res)=>{
    const {jobId,resumeLink}=req.body;
    const userId=req.user.userId;
    try{
        const app=new Application({jobId,userId,resumeLink});
        await app.save();
        return res.status(201).json({message:"Application added"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"});
    }
    
})

router.get("/mypostings",authMiddleware,async (req,res)=>{
    const user=req.user.userId;
    try{
        const jobs=await Job.find({recruiterId : user});
        return res.status(201).json({message:"found jobs", jobs});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"});
    }
    
})

router.get("/mypostings/:jobId", authMiddleware, async (req, res) => {

    const { jobId } = req.params;

    try {

        const applications = await Application
            .find({ jobId })
            .populate("userId", "name email");

        return res.status(200).json({ applications });

    }
    catch (err) {

        console.log(err);
        return res.status(500).json({ message: "Internal server error" });

    }

});

router.put("/job/:jobId/status", authMiddleware, async (req, res) => {
  try {
    const { jobId } = req.params;
    const { status } = req.body;

    // Only allow 'active' or 'closed'
    if (!["active", "closed"].includes(status.toLowerCase())) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const job = await Job.findByIdAndUpdate(
      jobId,
      { status },
      { new: true }
    );
    console.log("job=");
    console.log(job);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({ message: "Status updated", job });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:appId/status", authMiddleware, async (req, res) => {
  try {
    const { appId } = req.params;
    const { status } = req.body;

    const validStatuses = ["applied", "shortlisted", "rejected", "selected"];
    if (!validStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findByIdAndUpdate(
      appId,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    return res.status(200).json({ message: "Status updated", application });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports=router;
