"use client";

import React from "react";
import { useState, useEffect } from "react";
import Form from "@/app/_components/form";
import { useSession } from "next-auth/react";

const BookAppointment = () => {
  const { data: session } = useSession();

  console.log(session?.user, "in book appointment page");

  if (session?.user.role === "doctor") {
    return <div>You are not authorized to access this page</div>;
  }

  return <Form session={session} />;
};

export default BookAppointment;
