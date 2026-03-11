import { useEffect, useState } from "react";
import { getMyApps } from "../apis.js";
import "./MyApplications.css";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const data = await getMyApps();
      setApplications(data);
    };
    fetchApplications();
  }, []);

  return (
    <div className="apps-page-wrapper">
      <h2 className="apps-heading">My Applications</h2>

      {applications.length === 0 ? (
        <p>No applications yet</p>
      ) : (
        <div className="apps-container">
          {applications.map((app) => (
            <div key={app._id} className="application-card">
              <h3 className="app-title">{app.jobId?.title}</h3>
              <p className="app-company">{app.jobId?.company}</p>
              <p className="app-status">Status: {app.status}</p>
              <a
                href={app.resumeLink}
                target="_blank"
                className="app-resume-link"
              >
                View Resume
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;