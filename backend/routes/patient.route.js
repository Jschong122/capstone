import { Router } from "express";
import PatientModel from "../models/patient.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const patients = await PatientModel.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const patient = await PatientModel.create({ name, email, password });
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: "Invalid request", error: error.message });
  }
});

export { router as patientRouter };
