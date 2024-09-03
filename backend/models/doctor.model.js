import { doctorSchema } from "../database/db.schema.js";
import mongoose from "mongoose";

const DoctorModel = mongoose.model("Doctor", doctorSchema);

export default DoctorModel;
