import Footer from "@/components/HomeScreen/Footer";
import Navbar from "@/components/HomeScreen/Navbar";
import React from "react";

function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default ContactLayout;
