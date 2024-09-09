import { Comfortaa } from "next/font/google";
import "./globals.css";
import NavBar from "./_components/NavBar";

import Footer from "./_components/Footer";
import SessionWrapper from "./_components/SessionProvider";

const comfortaa = Comfortaa({ subsets: ["latin"] });

export const metadata = {
  title: "Medical System",
  description: "Medical System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${comfortaa.className} bg-gray-100 w-full h-full`}>
        <SessionWrapper>
          <NavBar />
          {children}
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
