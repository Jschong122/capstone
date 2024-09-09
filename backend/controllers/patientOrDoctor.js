import PatientModel from "../models/patient.model.js";
import DoctorModel from "../models/doctor.model.js";

const patientOrDoctorSignup = async (req, res, next) => {
  console.log("Received  request", req.body);
  const { email, role, password } = req.body;

  if (!email || !role || !password) {
    return res.status(400).json({ message: "missing email, role or password" });
  }

  try {
    const patientExists = await PatientModel.findOne({ email });
    const doctorExists = await DoctorModel.findOne({ email });

    if (patientExists || doctorExists) {
      // 用户存在，将用户信息传递给下一个中间件
      req.oldUser = patientExists || doctorExists;
      console.log("old user found:", req.oldUser);
    } else if (!patientExists && !doctorExists) {
      // 用户不存在，准备创建新用户
      req.newUser = { email, role, password };
      console.log("new user:", req.newUser);
    }

    next();
  } catch (error) {
    console.error("error when checking user", error);
    return res.status(500).json({ message: "server error" });
  }
};

const patientOrDoctorLogin = async (req, res, next) => {
  console.log("Received login request", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "missing email or password" });
  }

  try {
    const patientExists = await PatientModel.findOne({ email });
    const doctorExists = await DoctorModel.findOne({ email });

    if (patientExists || doctorExists) {
      req.oldUser = patientExists || doctorExists;
      console.log("old user found:", req.oldUser);
      next();
    } else {
      return res.status(400).json({ message: "user not found" });
    }
  } catch (error) {
    console.error("error when checking user information", error);
    return res.status(500).json({ message: "server error" });
  }
};

export { patientOrDoctorSignup, patientOrDoctorLogin };
