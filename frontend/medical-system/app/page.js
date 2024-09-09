import DoctorPanel from "./_components/AfterLogin/DoctorPanel";
import PatientPanel from "./_components/AfterLogin/PatientPanel";
import Section from "./_components/Section";
import Intro from "./_components/Intro";
export default function Home() {
  return (
    <div>
      <div>
        <h1>Welcome to the Medical System</h1>
      </div>

      {/* hero section */}
      <Section />

      {/* intro */}
      <Intro />
    </div>
  );
}
