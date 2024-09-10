"use client";

import Intro from "./_components/Intro";
import { useSession } from "next-auth/react";
import { DoctorSection } from "./_components/Section";

export default function Home() {
  const { data: session } = useSession();

  if (session?.user.role === "doctor") {
    return (
      <div>
        <DoctorSection />
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
}
