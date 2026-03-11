import { useState } from "react"
import { signup } from "../apis.js";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
    const [formData,setformData] = useState({
        name:"",
        email:"",
        password:"",
        role:"job_seeker"
    });
    const navigate = useNavigate();

    const handleChange=(e)=>{
        setformData({...formData, [e.target.name]:e.target.value});
    };

    const handleSignup=async(e)=>{
        e.preventDefault();
        try{
            const res=await signup(formData);
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("userId", res.data.user.userId);
            localStorage.setItem("role", res.data.user.role);
            alert("Signup Successful");
            navigate("/jobs");
        }
        catch(err){
            console.log(err.response?.data?.message);
            alert("Something went wrong");
        }
    }

    return(
        <div className="signup-wrapper">
            <form className="signup-form" onSubmit={handleSignup}>
                <input
                    className="signup-input"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    className="signup-input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    className="signup-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <select className="signup-input" name="role" value={formData.role} onChange={handleChange}>
                    <option value="job_seeker">Job Seeker</option>
                    <option value="recruiter">Recruiter</option>
                </select>
                <button className="signup-button" type="submit">Signup</button>
                <p className="login-link">
                    Already have an account? 
                    <span onClick={() => navigate("/login")}> Login</span>
                </p>
            </form>
        </div>
    )
}

export default Signup;