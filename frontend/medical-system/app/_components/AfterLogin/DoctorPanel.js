"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import panel from "./panel.css";

const DoctorPanel = ({ doctorId }) => {
  const [list, setList] = useState([]);
  const [referenceId, setReferenceId] = useState("");

  useEffect(() => {
    getAppointments(doctorId);
  }, [doctorId]);

  async function getAppointments(doctorId) {
    try {
      const response = await axios.get(
        `http://localhost:5000/appointments/patient/${doctorId}`
      );
      if (response.status === 200) {
        setList(response.data);
      } else {
        console.log("get appointments failed");
      }
    } catch (error) {
      console.log(error, "error when get appointments");
    }
  }
  function completeFile() {
    const referenceId = list[0]._id;
    try {
      const response = axios.put(
        `http://localhost:5000/appointments/complete/${referenceId}`
      );
      if (response.status === 200) {
        console.log(response.data, "appointment closed successfully");
      } else {
        console.log("get appointments failed");
      }
    } catch (error) {
      console.log(error, "error when get appointments");
    }
  }
  return (
    <div>
      <h1> patients appointments</h1>
      {/* display list of appointments  */}
      <div className=" ">
        {list.map((records) => (
          <div
            key={records._id}
            className="card m-2 bg-cyan-800/20 p-10 rounded "
          >
            <div className=" ">
              <div className="records-info">
                <div className="flex flex-col items-start gap-2">
                  <h3>Appointment reference : {records._id}</h3>
                  <h3>Date: {records.appointmentDate}</h3>
                  <h3>Time: {records.appointmentTime}</h3>
                  <h3>Patient: {records.patientName} </h3>
                  <h3>
                    {records.patientNotes === ""
                      ? "Note: patient did not provide note*"
                      : `Note: ${records.patientNotes}`}
                  </h3>
                  <h3>
                    Status:
                    {records.status === "completed" ? (
                      <span className="bg-gray-500 text-gray-100 rounded-full px-3 ml-3">
                        {records.status}
                      </span>
                    ) : (
                      <span className="bg-green-700 text-gray-100 rounded-full px-3 ml-3">
                        {records.status}
                      </span>
                    )}
                  </h3>
                </div>
              </div>
              {/* check if appointment is completed */}
              {records.status === "completed" ? (
                <h3 className="text-gray-500 mt-5 text-center">
                  This is a completed appointment. You don't need to do anything
                </h3>
              ) : (
                // doctor action panel
                <div className=" flex flex-col mt-5  ">
                  <Separator className=" bg-slate-400 w-[80%] h-[2px] mb-3 mx-auto" />
                  <div className="wrapper items-center  bg-slate-200 p-5 rounded">
                    <h3 className="mb-3"> Action panel</h3>
                    <div className=" my-0.5 md:flex">
                      <label className="ml-5">patient is good</label>
                      <button className="btn" onClick={completeFile}>
                        close file
                      </button>
                    </div>
                    <div className=" my-0.5 md:flex ">
                      <label className="ml-5"> view comments</label>
                      <a
                        href={`/profile/my-appointment/${records._id}`}
                        className="btn"
                      >
                        go to comments
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorPanel;
