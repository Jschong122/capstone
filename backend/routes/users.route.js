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
    if (req.oldUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    if (req.newUser) {
      console.log("creating a new user:", req.newUser);
    }

    const { password, name, specialty } = req.body;
    const { email, role } = req.newUser;

    // bycrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let createUser;

    // choose different model based on role
    if (role === "patient") {
      createUser = new PatientModel({
        email,
        password: hashedPassword,
        role: "patient",
        name,
      });
    } else if (role === "doctor") {
      createUser = new DoctorModel({
        email,
        password: hashedPassword,
        name,
        role: "doctor",
        specialty,
      });
    } else {
      return res.status(400).json({ message: "Invalid user role" });
    }

    await createUser.save();

    res.status(201).json({
      message: "Signup success",
      user: {
        id: createUser._id,
        email: createUser.email,
        role: createUser.role,
        name: createUser.name,
        imageUrl: createUser.imageUrl,
      },
    });
  } catch (error) {
    console.error("signup failed:", error);
    res.status(500).json({ message: "signup failed, server error" });
  }
});

router.post("/login", patientOrDoctorLogin, async (req, res) => {
  const { password } = req.body;

  const user = req.oldUser;
  console.log("oldUser:", user);

  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "password is not valid" });
    }
    res.json({
      message: "login success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        specialty: user.specialty,
        imageUrl: user.imageUrl,
      },
    });
  } catch (error) {
    console.error("login failed:", error);
    res.status(500).json({ message: "login failed, server error" });
  }
});

export { router as usersRouter };
