import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Form = ({ session }) => {
  console.log(session, "in form");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [doctorList, setDoctorList] = useState([]);

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

  const handleSubmit = () => {
    console.log(doctor, date, message);

    axios.post("http://localhost:5000/appointments/create", {
      patientId: session.id,
      patientName: session.name,
      patientEmail: session.email,
      doctor,
      date,
      message,
    });

    console.log("Form submitted");
  };

  return (
    <div className="h-screen">
      <div className="  flex flex-col items-center justify-center m-5 ">
        <h1 className="font-bold justify-center items-center m-5 ">
          Book your next appointment
        </h1>

        <form className=" flex flex-col md:flex-row ">
          {/* select doctor */}
          <div className="flex flex-col items-start justify-center m-5">
            <div>
              <label className="text-xl font-bold">preferred doctor</label>
              <select
                className=" m-2"
                onChange={(e) => setDoctor(e.target.value)}
              >
                <option className=" m-2" value="">
                  Select Doctor
                </option>
                {doctorList.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    Dr. {doctor.name}
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

            {/* message */}
          </div>
          <textarea
            className=" m-2 p-5 h-[100px] max-w-[80%] max-h-[80%]"
            placeholder="Please enter your message"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </form>
        <button
          disabled={doctor === "" || date === ""}
          className="bg-dark-green text-white p-2  m-3 flex justify-center items-center rounded-xl"
          onClick={handleSubmit}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Form;
