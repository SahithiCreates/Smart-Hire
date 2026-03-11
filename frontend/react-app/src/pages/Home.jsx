import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-wrapper">
            <div className="home-container">
                <h1 className="home-title">Welcome to SMARTHIRE</h1>
                <p className="home-subtitle">
                    Find your matching job AND the ideal candidate effortlessly!.
                </p>
                <button className="home-button" onClick={() => navigate("/signup")}>
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Home;