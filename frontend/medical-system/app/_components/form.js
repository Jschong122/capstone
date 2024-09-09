import React from "react";
import { useState } from "react";
import axios from "axios";

const Form = ({}) => {
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    console.log(doctor, date, message);

    // axios.post("/api/book-appointment", {
    //   patientId: "session.user.id",
    //   patientName: "session.user.name",
    //   doctor,
    //   date,
    //   message,
    // });

    console.log("Form submitted");
  };

  return (
    <div className="w-full h-full">
      <div className="  flex flex-col items-center justify-center ">
        <h1 className="text-3xl font-bold justify-center items-center m-5 ">
          Book your next appointment
        </h1>

        <form className=" flex flex-col md:flex-row">
          {/* select doctor */}
          <div className="flex flex-col items-start justify-center">
            <div>
              <label className="text-xl font-bold">preferred doctor</label>
              <select
                className=" m-2"
                onChange={(e) => setDoctor(e.target.value)}
              >
                <option className=" m-2" value="">
                  Select Doctor
                </option>
                <option className=" m-2" value="Dr. John Doe">
                  Dr. John Doe
                </option>
                <option className=" m-2" value="Dr. Jane Doe">
                  Dr. Jane Doe
                </option>
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
