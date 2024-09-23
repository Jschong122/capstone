import React, { useState, useEffect } from "react";
import panel from "./panel.css";
import axios from "axios";
import { Pointer } from "lucide-react";
import Page from "../../profile/my-appointment/[records._id]/page.js";

const PatientPanel = ({ patientId }) => {
  const [list, setList] = useState([]);

  const [referenceId, setReferenceId] = useState("");

  useEffect(() => {
    getAppointments(patientId);
  }, [patientId]);

  async function getAppointments(patientId) {
    console.log(patientId, "patient id in get appointments");

    try {
      const response = await axios.get(
        `http://localhost:5000/appointments/${patientId}`
      );

      if (response.status === 200) {
        console.log(response.data, "get appointments successful");
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
      <h1> Your appointments</h1>

      {/* display list of appointments  */}
      <div className="flex flex-wrap justify-center ">
        {list.map((records) => (
          <div key={records._id} className="card m-2 ">
            <div className="record-body flex flex-col  bg-white shadow-md rounded-[10px] overflow-hidden relative ">
              <div className="flex -m-3 bg-blue-200 px-5 pt-3">
                <div className="flex flex-col items-start">
                  <h3>
                    Date:
                    <span className="mx-3">{records.appointmentDate}</span>
                  </h3>
                  <h3>
                    <span>Time: {records.appointmentTime}</span>
                  </h3>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-start flex flex-col">
                  <span className="mt-2">Doctor: Dr. {records.doctorName}</span>
                  <span className="mt-2">
                    {" "}
                    {records.patientNotes === ""
                      ? ""
                      : `Note: ${records.patientNotes}`}
                  </span>
                  <span className="mt-2">
                    Status:
                    {records.status === "completed" ? (
                      <span className="bg-gray-500 text-gray-100 rounded-full px-3 py-1 ml-3">
                        {records.status}
                      </span>
                    ) : (
                      <span className="bg-green-700 text-gray-100 rounded-full px-3 py-1 ml-3">
                        {records.status}
                      </span>
                    )}
                  </span>
                </h3>
              </div>
              <div className="">
                <span className=" bg-light-green text-gray-100 rounded-tl-full rounded-bl-full px-5 py-5 absolute right-0 bottom-0">
                  Appointment reference : {records._id}
                </span>
              </div>

              {records.status === "completed" ? (
                <h3 className="text-gray-500 mt-5">
                  You have already completed your appointment , You can't send
                  any more comments.
                </h3>
              ) : (
                <div className=" flex flex-col px-5 ">
                  <h3> How do you feel ?</h3>
                  <div className="wrapper items-center">
                    <div className=" my-0.5 md:flex">
                      <label className="ml-5">
                        I'm feeling good , no more appointment needed
                      </label>
                      <button className="btn" onClick={completeFile}>
                        close file
                      </button>
                    </div>
                    <div className=" my-0.5 md:flex ">
                      <label className="ml-5"> No, I'm not good</label>
                      <a
                        href={`/profile/my-appointment/${records._id}`}
                        className="btn"
                      >
                        leave a comment
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

export default PatientPanel;
