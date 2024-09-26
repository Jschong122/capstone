"use client";
import React from "react";
import PatientPanel from "@/app/_components/afterLogin/PatientPanel";
import { useSession } from "next-auth/react";

const MyAppointment = () => {
  const { data: session } = useSession();

  const id = session?.user?.id;

  return (
    <div>
      <PatientPanel patientId={id} />
    </div>
  );
};

export default MyAppointment;
