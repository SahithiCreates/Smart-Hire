require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB(); 

app.use(cors());
app.use(express.json());

const authRoutes=require("./routes/authRoutes");
app.use("/auth",authRoutes);

const jobRoutes=require("./routes/jobRoutes");
app.use("/job",jobRoutes);

const appRoutes=require("./routes/applicationRoutes");
app.use("/applications",appRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});