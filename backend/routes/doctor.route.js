import { Router } from "express";
import DoctorModel from "../models/doctor.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const doctors = await DoctorModel.find({}, "name email specialty");
    const doctorsWithRole = doctors.map((doctor) => ({
      ...doctor.toObject(),

      role: "Doctor",
    }));

    return res.json(doctorsWithRole);
  } catch (error) {
    console.error("Fetch doctors list failed:", error);
    return res
      .status(500)
      .json({ message: "Server error when fetching doctors" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    const doctor = await DoctorModel.findByIdAndUpdate(id, {
      name,
      email,
      password,
      role,
    });
    res.json(doctor);
  } catch (error) {
    res.status(404).json({ message: "Doctor id not found" });
  }
});

export { router as doctorRouter };
