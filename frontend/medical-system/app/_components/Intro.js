import React from "react";

const Intro = () => {
  return (
    <div>
      {/* why chose us */}
      <div className=" intro-section bg-gradient-to-r from-gray-100 from to-60% to-bg-light-green">
        <h2>Why chose us</h2>
        <p>
          We are a medical appointment system that is dedicated to providing the
          best follow up care to our patients.
        </p>
      </div>

      {/* Certified Doctors */}
      <div className="intro-section bg-gradient-to-l from-gray-100 from to-70% to-bg-light-green">
        <h2>Certified Doctors</h2>
        <p>
          Our doctors are certified and have years of experience in the medical
          field.
        </p>
      </div>

      {/* Our doctors list */}
      <div className="intro-section bg-gradient-to-r from-gray-100 from to-30% to-bg-light-green">
        <h2>Our doctors list</h2>
        <p>
          Our doctors are certified and have years of experience in the medical
          field.
        </p>
      </div>
    </div>
  );
};

export default Intro;
