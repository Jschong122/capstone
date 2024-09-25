import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./database/dbConnect.js";
import { doctorRouter } from "./routes/doctor.route.js";
import { patientRouter } from "./routes/patient.route.js";
import { appointmentRouter } from "./routes/appointment.route.js";
import { usersRouter } from "./routes/users.route.js";
import { imageUploadRouter } from "./routes/imageUpload.route.js";
import { Server } from "socket.io";

import { createServer } from "node:http";

dotenv.config();

const app = express();

const server = createServer(app);
const io = new Server(server, {
  path: "/socket.io/chat",
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
});

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
app.use("/api", imageUploadRouter);

app.get("/", (req, res) => {
  res.send(`"Hello World" `);
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  // Listen for joinAppointment event
  socket.on("joinAppointment", ({ appointmentId }) => {
    if (appointmentId) {
      socket.join(appointmentId);
      socket.emit("joinedAppointment", { socketId: socket.id });
      console.log("User joined room:", appointmentId);
    } else {
      console.log("Invalid appointmentId");
    }
  });

  // Listen for new comment
  socket.on("sendComment", ({ message, sender }) => {
    socket.broadcast.emit("newComment", { message, sender });
    console.log("Sending message:", message, "from sender:", sender);
    console.log("Broadcasted newComment");
  });

  // when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

export default app;
