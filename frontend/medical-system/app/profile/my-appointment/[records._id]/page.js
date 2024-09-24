"use client";

import React, { useState, useEffect, useRef } from "react";
import leaveComments from "./leaveComments.css";
import { SendHorizonal } from "lucide-react";
import { io } from "socket.io-client";
import GreenDotAnimation from "@/app/_components/lotties/greenDot.js";
import { useSession } from "next-auth/react";

const page = () => {
  const [appId, setAppId] = useState("");
  const [id, setId] = useState("");
  const [socketId, setSocketId] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [doctor, setDoctor] = useState(false);
  const [patient, setPatient] = useState(false);
  const [sender, setSender] = useState("");

  const { data: session } = useSession();
  const role = session?.user?.role;
  const userId = session?.user?.id;

  useEffect(() => {
    if (role === "doctor") {
      setDoctor(true);
    } else if (role === "patient") {
      setPatient(true);
    }
  }, [session]);

  // Connect/define to socket server
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:5000", {
      path: "/socket.io/chat",
    });

    socket.current.on("connect", () => {
      console.log("Connected to socket server");
      setSocketId(socket.current.id);
    });

    // disconnect from socket server
    return () => {
      socket.current.disconnect();
      console.log("Disconnected from socket server");
    };
  }, []);

  useEffect(() => {
    //get appointment info
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf("/") + 1);
    setAppId(id);
  }, []);

  const handleSend = () => {
    const message = document.querySelector(".text-area").value;
    setMessage(message);
    document.querySelector(".text-area").value = "";

    // Emit message to server
    socket.current.emit("sendComment", {
      appointmentId: appId,
      message: message,
      sender: role,
    });
    console.log(role, "role");
    setMessages((prevMessage) => [
      ...prevMessage,
      { text: message, sender: role },
    ]);

    setSender(role);
    setMessage("");
  };

  //receive message from server
  useEffect(() => {
    socket.current.on("newComment", ({ message, sender }) => {
      console.log("Received message:", message, "from sender:", sender);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: sender },
      ]);
      setSender(sender);
    });
  }, []);

  console.log("messages", messages);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="intro p-2 mx-5 mt-2">
        <h3>
          Please enter your symptoms here, your doctor will review it later
        </h3>
        {socketId ? (
          <p className="flex items-center ">
            Connected
            <GreenDotAnimation />
          </p>
        ) : (
          <p> Not connected </p>
        )}
      </div>

      <div className="appointment-info">
        <h4> Appointment reference: </h4>
        <p> {appId}</p>
      </div>
      <div className="chatroom mx-auto w-full max-w-3xl">
        <div className="messages flex flex-col mt-3 px-auto  min-h-[300px]  ">
          {messages.map((msg, index) => {
            return msg.sender === "patient" ? (
              <span key={index} className="text-right">
                {" "}
                Patient: {msg.text}
              </span>
            ) : (
              <span key={index} className="text-left">
                {" "}
                Doctor: {msg.text}
              </span>
            );
          })}
        </div>

        <div className="text-area-wrapper absolute bottom-0  ">
          <textarea
            className="text-area "
            placeholder="Type your message here..."
          />
          <button className="absolute right-5 top-5" onClick={handleSend}>
            <SendHorizonal />
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
