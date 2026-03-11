const mongoose = require("mongoose");

const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    stipend:{
        type:String
    },
    recruiterId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    reqSkills:[{
        type:String,
        lowercase:true,
        trim:true
    }],
    status:{
        type:String,
        enum:["active","closed"],
        default:"active"
    },
    appCount:{
        type:Number,
        default:0
    }
}, 
{timestamps:true});
module.exports = mongoose.model("Job", jobSchema);