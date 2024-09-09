"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";
import DropdownAvatar from "./DropdownAvatar";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [session]);

  return (
    <div>
      <nav className="bg-dark-green flex p-5 justify-between">
        <ul className="flex space-x-4 ">
          <li>
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/patients" className="text-white hover:text-gray-300">
              Patients
            </Link>
          </li>
          <li>
            <Link href="/about-us" className="text-white hover:text-gray-300">
              About us
            </Link>
          </li>
        </ul>
        {/* conditional rendering for the login and logout buttons */}
        <ul className="flex space-x-4 justify-end">
          {isLoggedIn ? (
            <>
              <li className="text-white hover:text-gray-300">
                <DropdownAvatar data={session} />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/signup" className="text-white hover:text-gray-300">
                  Signup
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-white hover:text-gray-300">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
