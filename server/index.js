import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data

app.use("/api", UserRoutes);

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    status,
    message,
  });
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to Mongo DB");
  } catch (err) {
    console.error("Failed to connect with Mongo");
    console.error(err);
  }
};

const startServer = async () => {
  try {
    await connectDB();
    app.listen(5000, () => console.log("Server started on port 5000"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
