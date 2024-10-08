import PatientModel from "../models/patient.model.js";
import DoctorModel from "../models/doctor.model.js";

const patientOrDoctorSignup = async (req, res, next) => {
  console.log("Received signup request", req.body);
  const { email, role, password } = req.body;

  if (!email || !role || !password) {
    return res.status(400).json({ message: "missing email, role or password" });
  }

  try {
    const patientExists = await PatientModel.findOne({ email });
    const doctorExists = await DoctorModel.findOne({ email });

    if (patientExists || doctorExists) {
      req.oldUser = patientExists || doctorExists;
      console.log("old user found:", req.oldUser);
    } else {
      req.newUser = { email, role, password };
      console.log("new user:", req.newUser);
    }

    next();
  } catch (error) {
    console.error("error when checking user", error);
    return res.status(500).json({ message: "server error" });
  }
};

// login

const patientOrDoctorLogin = async (req, res, next) => {
  console.log("Received login request", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "missing email or password" });
  }

  try {
    const patientExists = await PatientModel.findOne({ email });
    const doctorExists = await DoctorModel.findOne({ email });

    if (!patientExists && !doctorExists) {
      console.log("user not found");
      return res.status(401).send({ message: "user not found" });
    }

    if (patientExists || doctorExists) {
      req.oldUser = patientExists || doctorExists;
      console.log("user found:", req.oldUser);

      // set the role of the user in req.oldUser
      if (patientExists) {
        req.oldUser.role = "patient";
      } else if (doctorExists) {
        req.oldUser.role = "doctor";
      }

      next();
    } else {
      return res.status(400).json({ message: "user not found" });
    }
  } catch (error) {
    console.error("error when checking user information", error);
    return res.status(500).json({ message: "server error" });
  }
};

//check if the user is a patient or doctor
const checkPatientOrDoctor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [patientExists, doctorExists] = await Promise.all([
      PatientModel.findOne({ _id: id }),
      DoctorModel.findOne({ _id: id }),
    ]);

    if (patientExists) {
      req.user = patientExists;
      req.userType = "patient";
      console.log("This user is a patient:", req.user);
    } else if (doctorExists) {
      req.user = doctorExists;
      req.userType = "doctor";
      console.log("This user is a doctor:", req.user);
    } else {
      console.error("User not found");
      return res.status(400).json({ message: "user not found" });
    }

    next();
  } catch (error) {
    console.error("Error when checking user information", error);
    res
      .status(500)
      .json({ message: "Server error when checking user information" });
  }
};

export { patientOrDoctorSignup, patientOrDoctorLogin, checkPatientOrDoctor };
