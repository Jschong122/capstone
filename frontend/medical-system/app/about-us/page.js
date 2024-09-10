import React from "react";

const aboutUs = () => {
  return (
    <div className="w-full">
      <div className="">
        <h1 className="p-5 text-5xl"> About Us</h1>
      </div>

      <div className="intro-section  ">
        <div>
          <h3> Medical Appointment System Overview</h3>
          <p>
            Our medical appointment system enables seamless communication
            between patients and doctors. The platform ensures that after an
            appointment is completed, the connection between the patient and
            doctor remains strong, facilitating ongoing interaction.
          </p>
        </div>

        <div>
          <h3 className="mt-7">Real-Time Notifications </h3>
          <p>
            The system provides real-time notifications whenever a doctor or
            patient adds new notes. This feature keeps both parties informed
            instantly about any updates related to the patient's condition. It
            enhances transparency and ensures that critical information is
            shared promptly.
          </p>
        </div>
        <div>
          <h3 className="mt-7">Collaborative Note Sharing</h3>
          <p>
            These notes serve as a collaborative space where patients and
            doctors can exchange insights or comments about the condition. This
            exchange of information helps both parties stay aligned on the
            treatment process.
          </p>
        </div>

        <div>
          {" "}
          <h3 className="mt-7">Chat Feature for Continuous Communication</h3>
          <p>
            The platform includes a chat feature that allows patients and
            doctors to discuss the patient's condition in more detail if needed.
            This ensures continuous, interactive care and encourages open
            communication throughout the treatment journey. process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default aboutUs;
