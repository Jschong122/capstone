"use client";

import React, { useState, useEffect, useRef } from "react";
import leaveComments from "./leaveComments.css";
import { SendHorizonal } from "lucide-react";
import { io } from "socket.io-client";
import GreenDotAnimation from "@/app/_components/lotties/greenDot.js";
import { useSession } from "next-auth/react";

const page = () => {
  const [appointmentId, setAppointmentId] = useState("");
  const [userId, setUserId] = useState("");
  const [socketId, setSocketId] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [role, setRole] = useState(false);

  const { data: session } = useSession();
  console.log(session, "session");
  const roleFromUser = session?.user?.role;

  const idFromUser = session?.user?.id;

  useEffect(() => {
    //get appointment info
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf("/") + 1);

    setAppointmentId(id);
  }, [session]);

  useEffect(() => {
    setUserId(idFromUser);
  }, [idFromUser]);

  useEffect(() => {
    setRole(roleFromUser);
  }, [roleFromUser]);

  // Connect/define to socket server
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:5000", {
      path: "/socket.io/chat",
    });

    // connect to socket server
    socket.current.connect();
    console.log("Connected to socket server");

    // join the appointment room
    console.log("Current appointmentId:", appointmentId);
    console.log(
      `User joined room:  ${appointmentId} , user is a ${role} ${userId} `
    );
    setSocketId(true);
    socket.current.emit("joinAppointment", appointmentId);

    socket.current.on("newComment", ({ message, sender }) => {
      console.log("Received message:", message, "from sender:", sender);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: sender },
      ]);
      setSender(sender);
    });
    console.log("Listening for newComment");

    // disconnect from socket server
    return () => {
      if (socket.current) {
        socket.current.disconnect();
        console.log("Disconnected from socket server");
      }
    };
  }, [session, appointmentId]);

  const handleSend = () => {
    const message = document.querySelector(".text-area").value;
    setMessage(message);
    document.querySelector(".text-area").value = "";

    // Emit message to server
    socket.current.emit("sendComment", {
      appointmentId: appointmentId,
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
        <p> {appointmentId}</p>
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
