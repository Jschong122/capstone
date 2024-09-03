import { Router } from "express";
import DoctorModel from "../models/doctor.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const doctors = await DoctorModel.find();
  res.json(doctors);
  res.status(404).json({ message: "No doctors found" });
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const doctor = await DoctorModel.create({ name, email, password });
  res.status(201).json(doctor);
  res.status(400).json({ message: "Invalid request" });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  const doctor = await DoctorModel.findByIdAndUpdate(id, {
    name,
    email,
    password,
    role,
  });
  res.json(doctor);
  res.status(404).json({ message: "Doctor id not found" });
});

export { router as doctorRouter };
