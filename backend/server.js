import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./database/dbConnect.js";
import { doctorRouter } from "./routes/doctor.route.js";
import { patientRouter } from "./routes/patient.route.js";
import { appointmentRouter } from "./routes/appointment.route.js";
import { usersRouter } from "./routes/users.route.js";
import { imageUploadRouter } from "./routes/imageUpload.route.js";
import { verifyToken } from "./controllers/verifyToken.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors(process.env.CORS_ORIGIN));

app.use(express.json());

// Connect to MongoDB
dbConnect();

// Routes
app.use("/users", usersRouter);
app.use("/doctors", doctorRouter);
app.use("/patients", patientRouter);
app.use("/appointments", appointmentRouter);
app.use("/api/upload", imageUploadRouter);

app.get("/", (req, res) => {
  res.send(`"Hello World" `);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`"http://localhost:${PORT}"`);
});

export default app;
