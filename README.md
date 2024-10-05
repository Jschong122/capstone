This is my first capstone project - might not be perfect, but it’s a fun and exciting start!

# Project Status
This project is not a fully finished product due to time limitations, but it packs a punch! The main focus was to showcase the skills involved in building a medical appointment system, including real-time communication, authentication, and database management. Some features, like notifications and fetching data to display doctor availability, are not yet implemented.

## Overview
The Medical Appointment System is a web-based application designed to make communication between patients and doctors as easy as chatting with a friend!

## Key Features
- **Appointment Management**: Patients can book and manage their medical appointments online without any fuss, while doctors can view and manage their schedules easily.
- **Real-Time Chat Interface**: Using Socket.io, patients and doctors can chat instantly about medical conditions, updates, and inquiries—just like texting a buddy! This helps keep everyone on the same page and improves patient care.
- **Note Sharing**: Both doctors and patients can write and exchange notes related to the medical condition—think of it as a shared medical journal where you can jot down important details.

## Technologies Used
- **Frontend**: React.js with Shadcn UI components for a smooth, user-friendly experience.
- **Backend**: Node.js with Express for handling all the server-side magic.
- **Real-Time Communication**: Socket.io for instant messaging between patients and doctors.
- **Authentication**: NextAuth for secure, hassle-free logins.
- **Database**: MongoDB for storing patient, doctor, and chat history.
- **Cloud Storage**: Cloudinary for photo uploads, making sharing symptoms a breeze!

## Installation and Setup
To get the Medical Appointment System up and running on your local machine, follow these easy steps:

1. **Clone the repository**:
   ```sh
   git clone <repository-url>
   ```

2. **Install dependencies** for both frontend and backend:
   ```sh
   cd frontend/medical-system
   npm install
   cd backend
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory and add the following configurations:
     - `DATABASE_URL`: Your MongoDB connection string.
     - `NEXTAUTH_SECRET`: A secret key for NextAuth.
     - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name.
     - `CLOUDINARY_API_KEY`: Your Cloudinary API key.
     - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret.

4. **Run the backend server**:
   ```sh
   npm run start
   ```

5. **Run the frontend development server**:
   ```sh
   cd frontend/medical-system
   npm start
   ```

6. **Access the application**:
   - Open [http://localhost:3000](http://localhost:3000) in your browser to start your journey to hassle-free healthcare!

## Usage
- **Patients** can create an account, book appointments, chat with doctors, and view their medical history—all from the comfort of their couch.
- **Doctors** can manage their appointments, view patient details, and communicate with patients through the chat interface—making their workflow easier and more efficient.

## Future Enhancements
- **Photo Upload (Patient with Symptoms)**: Patients will be able to upload photos of their symptoms to help doctors diagnose better.
- **Prescription Management**: Doctors will generate and share prescriptions digitally—goodbye paper clutter!
- **Payment Gateway**: Integrate a payment system for booking paid consultations—easy and secure.
