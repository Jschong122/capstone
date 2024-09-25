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
    origin: "*",
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
  socket.on("joinAppointment", (appointmentId) => {
    // Leave all other rooms before joining the new one
    Object.keys(socket.rooms).forEach((room) => {
      if (room !== socket.id) {
        socket.leave(room);
      }
    });

    socket.join(appointmentId);
    console.log(`User ${socket.id} joined appointment: ${appointmentId}`);
  });

  // Listen for leaveAppointment event
  socket.on("leaveAppointment", (appointmentId) => {
    socket.leave(appointmentId);
    console.log(`User ${socket.id} left appointment: ${appointmentId}`);
  });

  // Listen for new comment
  // Listen for new comment
  socket.on("sendComment", ({ appointmentId, message, sender }) => {
    // Emit the event to the specific room
    io.to(appointmentId).emit("newComment", { message, sender });
    console.log("Sending message:", message, "from sender:", sender);
    console.log("Broadcasted newComment to room:", appointmentId);
  });

  // when disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

export default app;
