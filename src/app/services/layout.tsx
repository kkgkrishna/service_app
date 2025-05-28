import Footer from "@/components/HomeScreen/Footer";
import Navbar from "@/components/HomeScreen/Navbar";
import React from "react";

function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default ServicesLayout;
