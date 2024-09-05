import { Comfortaa } from "next/font/google";
import "./globals.css";
import SideBar from "./components/SideBar";

import Footer from "./components/Footer";

const comfortaa = Comfortaa({ subsets: ["latin"] });

export const metadata = {
  title: "Medical System",
  description: "Medical System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${comfortaa.className} bg-gray-100 w-full h-full`}>
        <SideBar />

        {children}
        <Footer />
      </body>
    </html>
  );
}
