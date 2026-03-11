import { useState } from "react"
import { login } from "../apis.js";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // use same CSS as signup

const Login = () => {
    const [formData,setformData] = useState({
        email:"",
        password:""
    });
    const navigate = useNavigate();

    const handleChange=(e)=>{
        setformData({...formData, [e.target.name]: e.target.value});
    };

    const handleLogin=async (e)=>{
        e.preventDefault();
        try{
            const res=await login(formData);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.user.userId);
            localStorage.setItem("role", res.data.user.role);
            alert("Login Successful");
            navigate("/jobs");
        }
        catch(err){
            console.log(err);
            alert("Something went wrong!");
        }
    }

    return(
        <div className="signup-wrapper">
            <form className="signup-form" onSubmit={handleLogin}>
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
                <button className="signup-button" type="submit">Login</button>

                <p className="login-link">
                    Don’t have an account? 
                    <span onClick={() => navigate("/signup")}> Signup</span>
                </p>
            </form>
        </div>
    )
}

export default Login;