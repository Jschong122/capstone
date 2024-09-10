import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
  },
  profileImageUrl: String,
});

const patientSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  birthday: {
    type: String,
  },
});

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  appointmentTime: Date,
  status: {
    type: String,
    default: "confirmed",
    enum: ["confirmed", "cancelled", "completed"],
  },
  userNotes: String,
  doctorNotes: String,
  patientName: String,
  doctorName: String,
  doctorSpecialty: String,
});

const chatHistorySchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  messages: [
    {
      sender: {
        type: String,
        enum: ["patient", "doctor"],
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  doctorName: String,
  patientName: String,
});

//pre-save middleware to populate doctor and patient names , show in chat history
chatHistorySchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("appointmentId")) {
    const appointment = await mongoose
      .model("Appointment")
      .findById(this.appointmentId);
    if (appointment) {
      this.doctorName = appointment.doctorName;
      this.patientName = appointment.patientName;
    }
  }
  next();
});

export { doctorSchema, patientSchema, appointmentSchema, chatHistorySchema };
