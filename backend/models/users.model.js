import { Router } from "express";
import bcrypt from "bcrypt";
import PatientModel from "../models/patient.model.js";
import DoctorModel from "../models/doctor.model.js";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { password } = req.body;
    const { email, role } = req.newUser || {};

    if (!email || !role || !password) {
      return res
        .status(400)
        .json({ message: "missing email, role or password" });
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
      });
    } else if (role === "doctor") {
      createUser = new DoctorModel({
        email,
        password: hashedPassword,
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

router.post("/login", async (req, res) => {
  const { password } = req.body;
  const user = req.user;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "password is not valid" });
  }

  res.json({
    message: "login success",
    user: { id: user._id, email: user.email, role: user.role },
  });
});

export { router as usersRouter };
