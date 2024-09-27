import request from "supertest";
import app from "../server.js";

describe("Simple Doctor API Tests", () => {
  let doctorId;

  // Create a fake doctor user before running tests
  beforeAll(async () => {
    const res = await request(app).post("/users/signup").send({
      email: "testdoctor@example.com",
      password: "password123",
      name: "Test Doctor",
      role: "doctor",
      specialty: "General Practice",
    });
    doctorId = res.body.user.id;
  });

  // User Routes
  it("should log in the doctor", async () => {
    const res = await request(app).post("/users/login").send({
      email: "testdoctor@example.com",
      password: "password123",
    });
    expect(res.status).toBe(200);
  });

  // Doctor Routes
  it("should get a list of doctors", async () => {
    const res = await request(app).get("/doctors");
    expect(res.status).toBe(200);
  });

  it("should update doctor information", async () => {
    const res = await request(app).put(`/doctors/${doctorId}`).send({
      name: "Updated Doctor Name",
      email: "updateddoctor@example.com",
      password: "newpassword123",
      role: "doctor",
    });

    expect(res.status).toBe(200);
  });

  // Appointment Routes
  it("should get all appointments", async () => {
    const res = await request(app).get("/appointments");
    expect(res.status).toBe(200);
  });

  it("should get appointments for the doctor", async () => {
    const res = await request(app).get(`/appointments/patient/${doctorId}`);
    expect(res.status).toBe(200);
  });

  it("should create a new appointment", async () => {
    const res = await request(app).post("/appointments/create").send({
      patientId: "123456789012345678901234", // This should be a valid patient ID in your database
      doctorId: doctorId,
      date: "2023-09-30",
      time: "14:00",
      message: "Test appointment",
    });
    expect(res.status).toBe(201);
  });

  // Chat History Routes - no api testing for this . required appointmentId to make it work

  // Image Upload Routes - no api testing for this . required image url from cloudinary to make it work
});
