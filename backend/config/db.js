const mongoose =require("mongoose");

const connectDB=async ()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected!!");
    }
    catch(err){
        console.log(err);
    }
}

module.exports=connectDB;