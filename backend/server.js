require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

//Middleware to handel cors

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//Middleware
app.use(express.json());

//connect database
connectDB();

//Routes
app.use("/api/auth",authRoutes);
//app.use("/api/users",userRoutes);
//app.use("/api/task",taskRoutes);
//app.use("/api/report",reportRoutes);

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('server running on port 5000'))