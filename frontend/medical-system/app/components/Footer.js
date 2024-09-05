import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark-green text-white p-6">
      <div className="container mx-auto flex justify-around">
        <div>
          <h3 className="text-xl font-bold mb-4 underline">Useful Links</h3>
          <ul>
            <li>
              <a href="/about-us" className="hover:underline">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms of service
              </a>
            </li>
            <li>
              <a href="/login" className="hover:underline">
                Login
              </a>
            </li>
            <li>
              <a href="/Signup" className="hover:underline">
                Signup
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 underline">Quick Navigation</h3>
          <ul>
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Our doctors
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
