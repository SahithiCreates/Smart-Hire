import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApplicants, updateApplicantStatus } from "../apis";
import "./Applicants.css";

const Applicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    getApplicants(jobId).then(data =>
      { const sorted = data.sort((a, b) => b.matchScore - a.matchScore);
        setApplicants(data);
      });
  }, [jobId]);

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await updateApplicantStatus(appId, newStatus);

      setApplicants(prev =>
        prev.map(app =>
          app._id === appId ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      console.error("Failed to update applicant status:", err);
      alert("Error updating status. Try again.");
    }
  };

  return (
    <div className="applicants-wrapper">
      <h2>Applicants</h2>
      <table className="applicants-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Resume</th>
            <th>Status</th>
            <th>Match Score</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map(app => (
            <tr key={app._id} className="applicant-row">
              <td>{app.userId.name}</td>
              <td>{app.userId.email}</td>
              <td>
                <a className="resume-link" href={app.resumeLink} target="_blank">
                  View Resume
                </a>
              </td>
              <td>
                <select
                  className={`status-select ${app.status.toLowerCase()}`}
                  value={app.status}
                  onChange={e => handleStatusChange(app._id, e.target.value)}
                >
                  <option value="applied">Applied</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                  <option value="selected">Selected</option>
                </select>
              </td>
              <td>{app.matchScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Applicants;