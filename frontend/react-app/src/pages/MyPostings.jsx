import { useEffect, useState } from "react";
import { getPostings, updateJobStatus } from "../apis.js";
import { useNavigate } from "react-router-dom";
import "./MyPostings.css";

const MyPostings = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPostings().then(data => setJobs(data));
  }, []);

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      await updateJobStatus(jobId, newStatus);

      setJobs(prevJobs =>
        prevJobs.map(job =>
          job._id === jobId ? { ...job, status: newStatus } : job
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Error updating status. Try again.");
    }
  };

  return (
    <div className="mypostings-wrapper">
      <h2>My Job Postings</h2>
      <table className="mypostings-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Status</th>
            <th>View Applicants</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job._id} className="mypostings-row">
              <td>{job.company}</td>
              <td>{job.title}</td>
              <td>
                <select
                  className={`status-select ${job.status.toLowerCase()}`}
                  value={job.status}
                  onChange={(e) => handleStatusChange(job._id, e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                </select>
              </td>
              <td>
                <button
                  className="view-btn"
                  onClick={() => navigate(`/mypostings/${job._id}`)}
                >
                  View Applicants
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPostings;