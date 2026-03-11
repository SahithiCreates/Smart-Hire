import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Jobs from "./pages/Jobs.jsx";
import PostJob from "./pages/PostJob.jsx";
import MyApplications from "./pages/MyApplications.jsx";
import MyPostings from "./pages/MyPostings.jsx";
import Applicants from "./pages/Applicants.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/jobs" element={<Jobs/>}></Route>
      <Route path="/postJob" element={<PostJob/>}></Route>
      <Route path="/myapplications" element={<MyApplications/>}></Route>
      <Route path="/mypostings" element={<MyPostings/>}></Route>
       <Route path="/mypostings/:jobId" element={<Applicants/>}></Route>
    </Routes>
  );
}

export default App;