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

  //define to socket server
  const socket = useRef(null);
  const currentRoom = useRef(null);

  //socket.io ----------------------------------------------------------------------
  useEffect(() => {
    socket.current = io("http://localhost:5000", {
      path: "/socket.io/chat",
    });

    // connect to socket server
    socket.current.connect();
    console.log("Connecting to socket server...");

    socket.current.on("connect", () => {
      // get socket id
      try {
        setSocketId(socket.current.id);
        console.log("Connected to socket server:", socket.current.id);
      } catch (error) {
        console.log("Error:", error);
      }
    });

    // join room
    if (socket.current) {
      // Leave the previous room if any

      socket.current.emit("leaveAppointment", currentRoom.current);

      // Join the new room
      socket.current.emit("joinAppointment", appointmentId);
      console.log(
        `Successfully joined appointment room:", ${appointmentId}, user is a ${role} ${userId}`
      );

      // Update the current room
      currentRoom.current = appointmentId;
      console.log("updated current room:", currentRoom.current);

      // Clear messages from the previous room
      setMessages([]);
    }
    // disconnect from socket server
    return () => {
      if (socket.current) {
        if (currentRoom.current) {
          socket.current.emit("leaveAppointment", currentRoom.current);
        }
        socket.current.disconnect();
        console.log("Disconnected from socket server");
      }
    };
  }, [appointmentId, userId, role]);

  // const handleSend = () => {
  //   const message = document.querySelector(".text-area").value;
  //   setMessage(message);
  //   document.querySelector(".text-area").value = "";

  //   // Emit message to server
  //   if (appointmentId) {
  //     socket.current.emit("sendComment", {
  //       appointmentId: appointmentId,
  //       message: message,
  //       sender: role,
  //     });
  //     console.log("Emitted message:", message, "from sender:", role);

  //     setMessages((prevMessage) => [
  //       ...prevMessage,
  //       { text: message, sender: role },
  //     ]);

  //     setMessage("");
  //   } else {
  //     console.log("no socket.id");
  //   }
  // };

  const handleSend = () => {
    const message = document.querySelector(".text-area").value;
    setMessage(message);
    document.querySelector(".text-area").value = "";

    // Emit message to server
    if (appointmentId) {
      socket.current.emit("sendComment", {
        appointmentId: appointmentId,
        message: message,
        sender: role,
      });
      console.log("Emitted message:", message, "from sender:", role);
    } else {
      console.log("no socket.id");
    }
  };

  useEffect(() => {
    const handleNewComment = (data) => {
      console.log("Received data:", data);
      const { message, sender } = data;
      console.log("Received message:", message, "from sender:", sender);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: sender },
      ]);
    };

    if (socket.current) {
      // Listen for newComment
      socket.current.on("newComment", handleNewComment);
      console.log("Listening for newComment event");

      return () => {
        socket.current.off("newComment", handleNewComment);
      };
    }
  }, [role, appointmentId, userId]);
  console.log("Messages:", messages);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="intro p-2 mx-5 mt-2">
        <h3>
          Please enter your symptoms here, your doctor will review it later
        </h3>
        {setSocketId ? (
          <span className="flex items-center ">
            Connected
            <GreenDotAnimation />
          </span>
        ) : (
          <span> Not connected </span>
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
