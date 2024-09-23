"use client";

import React, { useState, useEffect } from "react";
import leaveComments from "./leaveComments.css";
import { SendHorizonal } from "lucide-react";

const page = () => {
  const [records, setRecords] = useState("");

  //get appointment info
  useEffect(() => {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf("/") + 1);
    setRecords(id);
  }, []);

  return (
    <div>
      <h3 className="p-2 mt-2">
        Please enter your symptoms here, your doctor will review it later
      </h3>
      <div className="appointment-info">
        <h4> Appointment reference: </h4>
        <p> {records}</p>
      </div>
      <div className="chatroom">
        <div className="messages">
          <p>Doctor: How can I assist you today?</p>
          <p>You: I'm feeling a bit under the weather.</p>
          <p>
            Doctor: Sorry to hear that. Can you tell me more about your
            symptoms?
          </p>
        </div>

        <div className="text-area-wrapper  ">
          <textarea
            className="text-area"
            placeholder="Type your message here..."
          />
          <button className="absolute right-5 top-5">
            <SendHorizonal />
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
