import { Router } from "express";
import bcrypt from "bcrypt";
import PatientModel from "../models/patient.model.js";
import DoctorModel from "../models/doctor.model.js";
import {
  patientOrDoctorSignup,
  patientOrDoctorLogin,
} from "../controllers/patientOrDoctor.js";

const router = Router();

router.post("/signup", patientOrDoctorSignup, async (req, res) => {
  try {
    const { password, name } = req.body;
    const { email, role } = req.newUser || {};

    if (!email || !role || !password || !name) {
      return res
        .status(400)
        .json({ message: "missing email, role, password or name" });
    }

    // bycrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let createUser;

    // choose different model based on role
    if (role === "patient") {
      createUser = new PatientModel({
        email,
        password: hashedPassword,
        name,
      });
    } else if (role === "doctor") {
      createUser = new DoctorModel({
        email,
        password: hashedPassword,
        name,
      });
    } else {
      return res.status(400).json({ message: "Invalid user role" });
    }

    await createUser.save();

    res.json({
      message: "Signup success",
      user: { id: createUser._id, email: createUser.email, role },
    });
  } catch (error) {
    console.error("signup failed:", error);
    res.status(500).json({ message: "signup failed, server error" });
  }
});

router.post("/login", patientOrDoctorLogin, async (req, res) => {
  const { password } = req.body;

  if (!req.oldUser) {
    return res.status(400).json({ message: "user not found" });
  }

  const user = req.oldUser;

  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "password is not valid" });
    }
    res.json({
      message: "login success",
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("login failed:", error);
    res.status(500).json({ message: "login failed, server error" });
  }
});

export { router as usersRouter };
