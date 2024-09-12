"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export function DoctorSection() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user?.role === "doctor") {
    return (
      <div className="m-5 ">
        <h1>Welcome to the doctor page</h1>
        <div className="grid grid-cols-3 gap-4 mx-10">
          <div className="flex items-center">
            <Check />
            <h4>You can manage your appointments and patients here</h4>
          </div>
          <div className="flex items-center">
            <Check />
            <h4>You can communicate with your patients here</h4>
          </div>
          <div className="flex items-center">
            <Check />
            <h4>go to</h4>{" "}
            <a href="/doctor-panel" className="ml-2">
              DoctorPanel
            </a>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export function PatientSection() {
  const { data: session } = useSession();
  if (session?.user?.role === "patient") {
    return (
      <div>
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 h-[60vh]">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="relative h-64 overflow-hidden rounded-2xl sm:h-80 lg:order-last lg:h-full">
                <img
                  alt=""
                  src="/team.jpg"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              <div className="lg:py-24">
                <h1 className=" font-bold sm:text-4xl">
                  Book an appointment with us
                </h1>

                <p className="mt-4 text-gray-600">
                  Our certified doctors will follow up your condition after the
                  appointment
                </p>

                <a
                  href="/profile/book-appointment"
                  className="mt-8 inline-block rounded-full bg-dark-green px-8 py-3  font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring"
                >
                  Book an appointment
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  return null;
}
