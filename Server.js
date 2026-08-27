import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import flightRoutes from "./routes/flightRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("Database Name:", mongoose.connection.name);
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error");
    console.error(err);
  });

// Routes
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/flights", flightRoutes);

// Test Routes
app.get("/", (req, res) => {
  res.send("✈️ SkyWings Backend Running");
});

app.get("/test-server", (req, res) => {
  res.send("THIS IS THE CURRENT SERVER");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});