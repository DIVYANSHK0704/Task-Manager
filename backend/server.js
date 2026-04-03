require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

console.log("🚀 Starting server...");

// Middleware
app.use(cors());
app.use(express.json());


// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/tasks",taskRoutes);
//app.use("/api/report",reportRoutes);

// Start server (CRITICAL FIX)
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});