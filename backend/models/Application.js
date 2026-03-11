const mongoose = require("mongoose");


const appSchema=new mongoose.Schema({
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    resumeLink:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["applied","shortlisted","rejected","accepted"],
        default:"applied"
    },
    matchScore:{
        type:Number,
        default :0
    }
}, 
{timestamps:true});
appSchema.index({ jobId:1, userId:1 }, { unique:true });

module.exports = mongoose.model("Application", appSchema);