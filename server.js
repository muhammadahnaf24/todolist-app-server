// server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();

app.use(express.json());
const allowedOrigins = ["https://todolist-app-dun-seven.vercel.app/"]; // ganti dengan domain frontend Anda
app.use(cors({ origin: allowedOrigins, credentials: true }));
connectDB();

app.use("/auth", authRoutes); // Pastikan semua route auth berada di sini

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
