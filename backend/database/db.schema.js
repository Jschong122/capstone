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
  imageUrl: String,
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
  imageUrl: String,
});

const appointmentSchema = new mongoose.Schema(
  {
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
    appointmentDate: {
      type: Date,
      get: function (appointmentDate) {
        if (appointmentDate) {
          return appointmentDate.toISOString().split("T")[0];
        }
        return appointmentDate;
      },
      set: function (appointmentDate) {
        if (appointmentDate) {
          return new Date(appointmentDate);
        }
        return appointmentDate;
      },
      required: true,
    },

    appointmentTime: {
      type: String,
      required: true,
      get: function (appointmentTime) {
        if (appointmentTime) {
          // Convert 24-hour time to 12-hour format
          const [hours, minutes] = appointmentTime.split(":");
          const hour = parseInt(hours, 10);
          const ampm = hour >= 12 ? "PM" : "AM";
          const hour12 = hour % 12 || 12;
          return `${hour12}:${minutes} ${ampm}`;
        }
        return appointmentTime;
      },
      set: function (appointmentTime) {
        if (appointmentTime) {
          // Ensure time is in 24-hour format for storage
          const [time, period] = appointmentTime.split(" ");
          let [hours, minutes] = time.split(":");
          hours = parseInt(hours, 10);

          if (period === "PM" && hours !== 12) {
            hours += 12;
          } else if (period === "AM" && hours === 12) {
            hours = 0;
          }

          return `${hours.toString().padStart(2, "0")}:${minutes}`;
        }
        return appointmentTime;
      },
    },
    status: {
      type: String,
      default: "confirmed",
      enum: ["confirmed", "cancelled", "completed"],
    },
    patientNotes: String,
    doctorNotes: String,
  },
  { toJSON: { getters: true }, toObject: { getters: true } }
);

const chatHistorySchema = new mongoose.Schema(
  {
    appointmentId: {
      type: String,
      required: true,
      index: true, // For faster queries
    },
    messages: [
      {
        text: {
          type: String,
          required: true,
        },
        sender: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export { doctorSchema, patientSchema, appointmentSchema, chatHistorySchema };
