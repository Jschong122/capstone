import React from "react";
import Link from "next/link";

const SideBar = () => {
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
        <ul className="flex space-x-4 justify-end">
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
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
