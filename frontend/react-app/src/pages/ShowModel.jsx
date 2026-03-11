    import { useState } from "react"
    import {applyJob} from "../apis.js";

    const ShowModel =({jobId,onApplied,onClose})=>{
        const [resumeLink,setResumeLink]=useState("");

        const handleSubmit=async ()=>{
            if(!resumeLink){
                alert("Enter Resume Link");
                return;
            }
            try{
                const res=await applyJob(jobId,resumeLink);
                alert("Applied successfully!");
                onApplied();
                onClose();
            }
            catch(err){
                console.log(err);
                alert("Something went wrong!");
            }
        }
        return(
            <div>
                <div>
                <h3>Apply To This Job</h3>
                <input 
                    type="text"
                    placeholder="Enter Resume Link"
                    value={resumeLink}
                    onChange={(e)=>setResumeLink(e.target.value)}
                />  
                </div>
                <div>
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        )
    }

    export default ShowModel;