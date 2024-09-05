import PatientModel from "../models/patient.model.js";
import DoctorModel from "../models/doctor.model.js";

const patientOrDoctor = async (req, res, next) => {
  console.log("Received signup request", req.body);
  const { email, role, password } = req.body;

  if (!email || !role || !password) {
    return res.status(400).json({ message: "missing email, role or password" });
  }

  try {
    const patientExists = await PatientModel.findOne({ email });
    const doctorExists = await DoctorModel.findOne({ email });

    if (patientExists || doctorExists) {
      return res.status(400).json({ message: "user already exists" });
    }

    req.newUser = { email, role, password };

    next();
  } catch (error) {
    console.error("error when checking user", error);
    return res.status(500).json({ message: "server error" });
  }
};

export default patientOrDoctor;
