import { Router } from "express";
import AppointmentModel from "../models/appointment.model.js";
import DoctorModel from "../models/doctor.model.js";
import PatientModel from "../models/patient.model.js";

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

// get appointments by patientId
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const appointments = await AppointmentModel.find({ patientId: id });

    // get a new set of doctorIds arrays
    const doctorIds = [...new Set(appointments.map((app) => app.doctorId))];

    // find doctors by doctorIds
    const doctors = await DoctorModel.find({ _id: { $in: doctorIds } });

    const doctorNameMap = doctors.reduce((acc, doctor) => {
      if (doctor && doctor.name) {
        acc[doctor._id.toString()] = doctor.name;
        return acc;
      } else {
        console.warn("doctor name not found");
      }
      return acc;
    }, {});

    const appointmentsWithDoctorNames = appointments.map((app) => ({
      ...app.toObject(),
      doctorName: doctorNameMap[app.doctorId.toString()] || "Unknown Doctor",
    }));

    res.status(200).json(appointmentsWithDoctorNames);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//get appointments by doctorId
router.get("/patient/:id", async (req, res) => {
  try {
    //get all patient under this doctor
    const id = req.params.id;
    const appointments = await AppointmentModel.find({ doctorId: id });

    //get patientId from appointment
    const patientIds = appointments.map((app) => app.patientId);
    const patients = await PatientModel.find({ _id: { $in: patientIds } });
    const patientNameMap = patients.reduce((acc, patient) => {
      if (patient && patient.name) {
        acc[patient._id.toString()] = patient.name;
        return acc;
      } else {
        console.warn("patient name not found");
      }
      return acc;
    }, {});

    const appointmentsWithPatientName = appointments.map((app) => ({
      ...app.toObject(),
      patientName:
        patientNameMap[app.patientId.toString()] || "Unknown Patient",
    }));

    res.status(200).json(appointmentsWithPatientName);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { patientId, doctorId, date, message, time } = req.body;
    const appointment = await AppointmentModel.create({
      patientId,
      doctorId,
      appointmentDate: date,
      appointmentTime: time,
      status: "confirmed",
      patientNotes: message,
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

router.put("/complete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await AppointmentModel.findByIdAndUpdate(id, {
      status: "completed",
    });
    if (appointment) {
      res.json(appointment);
      console.log("appointment closed successfully");
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
