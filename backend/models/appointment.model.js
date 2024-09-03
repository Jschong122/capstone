import mongoose from "mongoose";
import { appointmentSchema } from "../database/db.schema.js";

const AppointmentModel = mongoose.model("Appointment", appointmentSchema);

export default AppointmentModel;
