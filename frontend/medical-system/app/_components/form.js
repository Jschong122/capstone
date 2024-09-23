import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import BackEndUrl from "@/lib/tokenMiddleware";

const Form = () => {
  const { data: session } = useSession("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [doctorList, setDoctorList] = useState([]);
  const [patient_id, setPatientId] = useState("");
  const [doctor_id, setDoctorId] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    getDoctorList();
  }, []);

  // fetch doctor list
  async function getDoctorList() {
    try {
      const res = await axios.get("http://localhost:5000/doctors");
      console.log(res.data, "doctors");
      setDoctorList(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  // get patient id
  function getPatientId() {
    const id = session?.user?.id;
    setPatientId(id);
  }
  // get doctor id
  function getDoctorId() {
    const selectedDoctor = doctorList.find((d) => d.name === doctor);
    if (selectedDoctor) {
      setDoctorId(selectedDoctor?._id);
    }
  }

  useEffect(() => {
    getPatientId();
    getDoctorId();
  }, [doctor]);

  const handleDoctorChange = async (e) => {
    const selectedDoctor = e.target.value;
    await setDoctor(selectedDoctor);
    getDoctorId();
  };

  const handleSubmit = async () => {
    console.log(patient_id, "patient id");
    console.log(doctor_id, "doctor id");
    console.log(date, "date");
    console.log(message, "message");

    try {
      await axios.post(`http://localhost:5000/appointments/create`, {
        patientId: patient_id,
        doctorId: doctor_id,
        date,
        time,
        message,
      });
      console.log("Form submitted");
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className=" w-[80vw] flex flex-col items-center justify-center m-10 rounded-3xl shadow-md  bg-white">
        <h1 className="font-bold m-5 ">Book your next appointment</h1>

        <form className=" flex flex-col md:flex-row w-[60vw] ">
          {/* select doctor */}
          <div className="flex flex-col items-start justify-center m-5">
            <div>
              <label className="text-xl font-bold">preferred doctor</label>
              <select className=" m-2" onChange={handleDoctorChange}>
                <option className=" m-2" value="">
                  Select Doctor
                </option>
                {doctorList.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>

            {/* select date */}
            <div className="flex  items-center justify-center">
              <label className="text-xl font-bold">select date</label>
              <input
                type="date"
                className=" m-2 p-2 rounded-md"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="flex  items-center justify-center">
              <label className="text-xl font-bold">select Time</label>
              <input
                type="time"
                className=" m-2 p-2 rounded-md"
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            {/* message */}
          </div>
          <textarea
            className=" m-2 p-5 h-[200px] w-[20vw] bg-slate-100 rounded-3xl"
            placeholder="Please enter your message"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </form>
        <button
          disabled={doctor === "" || date === "" || time === ""}
          className="bg-dark-green text-white p-2  m-3 flex justify-center items-center rounded-xl"
          onClick={handleSubmit}
        >
          Book Appointment
        </button>

        {success ? (
          <h3 className="text-green-500">
            Appointment booked successfully
            <p className="text-black flex flex-col outline outline-2 outline-black p-3 mt-3">
              <h3 className="underline">Your appointment detail</h3>
              <br />
              date: {date}
              <br />
              time: {time}
              <br />
              doctor: {doctor}
              <br />
              {message === "" ? "No message" : "message: " + message}
            </p>
          </h3>
        ) : (
          ""
        )}
        {error ? (
          <h3 className="text-red-500">Error booking appointment</h3>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default Form;
