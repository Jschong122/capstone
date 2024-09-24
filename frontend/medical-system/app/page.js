"use client";

import Intro from "./_components/Intro";
import { useSession } from "next-auth/react";
import { PatientSection, DoctorSection } from "./_components/Section";
import DoctorPanel from "./_components/afterLogin/DoctorPanel";

export default function Home() {
  const { data: session } = useSession();

  const doctorId = session?.user?.id;

  if (session?.user.role === "doctor") {
    return (
      <div className="m-5 ">
        <DoctorSection />
        <DoctorPanel doctorId={doctorId} />
      </div>
    );
  }

  if (session?.user.role === "patient") {
    return (
      <div>
        <PatientSection />
        <Intro />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[30vh]">
        <h1> You are not logged in! </h1>
        <h3> please log in to access the page </h3>
        <h3> if you don't have an account, please sign up </h3>
      </div>

      <Intro />
    </div>
  );
}
