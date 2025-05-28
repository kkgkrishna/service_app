import Footer from "@/components/HomeScreen/Footer";
import Navbar from "@/components/HomeScreen/Navbar";
import React from "react";

function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default AboutLayout;
