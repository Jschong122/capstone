import { patientSchema } from "../database/db.schema.js";
import mongoose from "mongoose";

const PatientModel = mongoose.model("Patient", patientSchema);

export default PatientModel;
