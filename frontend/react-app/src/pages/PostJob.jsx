import { useState } from "react";
import { postJob } from "../apis.js";
import { useNavigate } from "react-router-dom";
import "./PostJob.css";

const PostJob = () => {
    const [postForm, setPostForm] = useState({
        title: "",
        company: "",
        type: "",
        stipend: "",
        location: "",
        description: "",
        reqSkills: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setPostForm({ ...postForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const jobData = {
                ...postForm,
                reqSkills: postForm.reqSkills.split(",")
            };
            const res = await postJob(jobData);
            console.log(res);
            alert("Job posted!");
            navigate("/jobs");
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="postjob-wrapper">
            <form className="postjob-form" onSubmit={handleSubmit}>
                <input
                    className="postjob-input"
                    name="title"
                    placeholder="Job Title"
                    value={postForm.title}
                    onChange={handleChange}
                    required
                />
                <input
                    className="postjob-input"
                    name="company"
                    placeholder="Company"
                    value={postForm.company}
                    onChange={handleChange}
                    required
                />
                <input
                    className="postjob-input"
                    name="type"
                    placeholder="Full-time / Internship"
                    value={postForm.type}
                    onChange={handleChange}
                    required
                />
                <input
                    className="postjob-input"
                    name="stipend"
                    placeholder="Stipend / Salary"
                    value={postForm.stipend}
                    onChange={handleChange}
                />
                <input
                    className="postjob-input"
                    name="location"
                    placeholder="Location"
                    value={postForm.location}
                    onChange={handleChange}
                    required
                />
                <textarea
                    className="postjob-input"
                    name="description"
                    placeholder="Job Description"
                    value={postForm.description}
                    onChange={handleChange}
                    required
                />
                <input
                    className="postjob-input"
                    name="reqSkills"
                    placeholder="Skills (comma separated)"
                    value={postForm.reqSkills}
                    onChange={handleChange}
                    required
                />
                <button className="postjob-button" type="submit">Post Job</button>
            </form>
        </div>
    );
};

export default PostJob;