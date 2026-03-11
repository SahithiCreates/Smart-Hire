import { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { allJobs, getMyApps } from "../apis.js";
import { useNavigate } from "react-router-dom";
import "./Jobs.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchJobs();
    if (role === "job_seeker") fetchApplications();
  }, []);

  const fetchJobs = async () => {
    const data = await allJobs();
    if (data) {
      // Show only active jobs
      const activeJobs = data.filter((job) => job.status === "active");
      setJobs(activeJobs);
    }
  };

  const fetchApplications = async () => {
    const apps = await getMyApps();
    if (apps) {
      const appliedIds = apps.map((app) => app.jobId._id);
      setAppliedJobs(appliedIds);
    }
  };

  return (
    <div className="jobs-page-wrapper">
      {/* Header with heading + top-right buttons */}
      <div className="jobs-header">
        <h2 className="jobs-heading">Available Jobs</h2>
        <div className="header-buttons">
          {role === "job_seeker" && (
            <button onClick={() => navigate("/myapplications")}>
              My Applications
            </button>
          )}
          {role === "recruiter" && (
            <>
              <button onClick={() => navigate("/postJob")}>Add Job</button>
              <button onClick={() => navigate("/mypostings")}>
                See Postings
              </button>
            </>
          )}
        </div>
      </div>

      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        <div className="jobs-container">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              applied={appliedJobs.includes(job._id)}
              onApplied={() => setAppliedJobs((prev) => [...prev, job._id])}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;