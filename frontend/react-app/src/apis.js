import axios from "axios";

// const API=axios.create({baseURL: "http://localhost:5000/"});
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
export const signup=(data)=>{
    return API.post("/auth/signup",data);
}

export const login=(data)=>{
    return API.post("/auth/login",data);
}

export const allJobs = async () => {
  try {
    const token = localStorage.getItem("token"); 
    const { data } = await API.get("/job/postings", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data.jobs; 
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

export const postJob = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const { data: resData } = await API.post("/job/postJob", data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return resData;
  } catch (error) {
    console.error("Error posting job:", error);
    throw error;
  }
};

export const applyJob = async (jobId, resumeLink) => {
  try {
    const token = localStorage.getItem("token"); 

    const { data } = await API.post(
      "/applications/apply", 
      { jobId,resumeLink }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return data; 
  } catch (error) {
    console.error("Error applying for job:", error);
    return null;
  }
};

export const getMyApps=async ()=>{
  try{
    const token = localStorage.getItem("token"); 
    const { data } = await API.get(
      "/applications/myApplications",  
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(data);
    return data.applications;
  }
  catch (error) {
    console.error("Error fetching your applications : ", error);
    return null;
  }
};

export const getPostings=async ()=>{
  try{
    const token = localStorage.getItem("token"); 
    const { data } = await API.get(
      "/applications/mypostings",  
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return data.jobs;
  }
  catch (error) {
    console.error("Error fetching your applications : ", error);
    return null;
  }
};

export const updateJobStatus = async (jobId, status) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await API.put(
      `/applications/job/${jobId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Job status updated:", data);
    return data;
  } catch (error) {
    console.error("Error updating job status:", error);
    return null;
  }
};

export const getApplicants = async (jobId) => {

  try {

    const token = localStorage.getItem("token");

    const { data } = await API.get(
      `/applications/mypostings/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return data.applications;

  }
  catch (error) {

    console.error("Error fetching applicants:", error);
    return [];

  }

};

export const updateApplicantStatus = async (appId, status) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await API.put(
      `/applications/${appId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Applicant status updated:", data);
    return data;
  } catch (error) {
    console.error("Error updating applicant status:", error);
    return null;
  }
};