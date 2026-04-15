import { useState } from "react";
import ShowModel from "./ShowModel";
import "./JobCard.css";

const JobCard = ({ job, applied, onApplied }) => {
  const [showSubmit, setShowSubmit] = useState(false);
  const role = localStorage.getItem("role");

  const isClosed = job.status.toLowerCase() === "closed";
  const isApplied = applied;

  let buttonText = "";
  let buttonDisabled = false;

  if (isClosed) {
    buttonText = "Closed";
    buttonDisabled = true;
  } else if (isApplied) {
    buttonText = "Applied";
    buttonDisabled = true;
  } else {
    buttonText = "Apply";
    buttonDisabled = false;
  }

  return (
    <div className="jobcard-wrapper">
      <h3 className="jobcard-title">{job.title}</h3>
      <p className="jobcard-company">{job.company}</p>
      <p className="jobcard-info">{job.location} | {job.type}</p>
      <p className="jobcard-description">{job.description}</p>

      <div className="jobcard-skills">
        {job.reqSkills.map((skill) => (
          <span className="jobcard-skill" key={skill}>{skill}</span>
        ))}
      </div>
      {role==="job_seeker" && (
        <div>
      <p className="jobcard-title">Match Score:{job.matchScore}</p>
      <p className="jobcard-company">Matched Skills : {job.matchedSkills.join(", ")}</p>
      <p className="jobcard-info">Matched Skills : {job.missedSkills.join(", ")}</p>
      </div>
      )}

      {role === "job_seeker" && (
        <button
          className={`jobcard-button ${isClosed ? "closed" : ""}`}
          disabled={buttonDisabled}
          onClick={() => !isClosed && setShowSubmit(true)}
        >
          {buttonText}
        </button>
      )}

      {showSubmit && (
        <ShowModel
          jobId={job._id}
          onClose={() => setShowSubmit(false)}
          onApplied={onApplied}
        />
      )}
    </div>
  );
};

export default JobCard;