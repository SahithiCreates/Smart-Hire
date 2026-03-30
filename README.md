SmartHire – Job Matching Platform

SmartHire is a full-stack solution designed to streamline the recruitment process by dynamically connecting job seekers with recruiters. Built with the MERN stack, the platform focuses on data-driven hiring through an automated skill-matching engine.
🚀 Key Features :
Dual-Role Authentication: Secure user management using JWT-based authentication with distinct access levels for Recruiters and Job Seekers.

Dynamic Skill-Matching Engine: A custom algorithm that calculates matched and missing skills to rank applicants in real-time.

Role-Specific Dashboards: Custom views for recruiters to manage applicants and for seekers to track application status.

Optimized Performance: Efficient backend queries and frontend rendering to ensure a responsive user experience.

Match Analytics: Visual display of match percentages to help recruiters prioritize the best-fit talent.

Tech Stack :
Frontend: React.js, HTML5, CSS3.
Backend: Node.js, Express.js, REST APIs.
Database: MongoDB.
Security: JSON Web Tokens (JWT) for secure session management

Local Setup
To run this project locally, follow these steps:

Clone the repository:
git clone [Your-GitHub-Link-Here]

Install Backend Dependencies:
cd backend
npm install

Install Frontend Dependencies:
cd ../frontend
npm install

Environment Variables: Create a .env file in the backend folder and add your MONGO_URI and JWT_SECRET.

Run the App:
# In backend folder
npm start
# In frontend folder
npm start
