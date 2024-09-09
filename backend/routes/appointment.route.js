import { Router } from "express";
import AppointmentModel from "../models/appointment.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const appointments = await AppointmentModel.find();
    if (appointments.length > 0) {
      res.status(200).json(appointments);
    } else {
      res.status(404).json({ message: "No appointments found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { patientId, doctorId, date, message } = req.body;
    const appointment = await AppointmentModel.create({
      patientId,
      doctorId,
      date,
      message,
    });
    res.status(201).json(appointment);
  } catch (error) {
    if (error.name === "ValidationError") {
      res
        .status(400)
        .json({ message: "Invalid request", error: error.message });
    } else {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { patientId, doctorId, date, time } = req.body;
    const appointment = await AppointmentModel.findByIdAndUpdate(
      id,
      {
        patientId,
        doctorId,
        date,
        time,
      },
      { new: true }
    );
    if (appointment) {
      res.json(appointment);
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await AppointmentModel.findByIdAndDelete(id);
    if (appointment) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export { router as appointmentRouter };
