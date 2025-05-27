import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import ToolbarHero from "@/components/HomeScreen/ToolbarHero";
import AboutSection from "@/components/HomeScreen/AboutSection";
import ServicesSection from "@/components/HomeScreen/ServicesSection";
import DownloadAppSection from "@/components/HomeScreen/DownloadAppSection";
import AppUsageGuide from "@/components/HomeScreen/AppUsageGuide";
import Footer from "@/components/HomeScreen/Footer";

export default function Home() {
  // redirect("/login");
  return (
    <>
      <ToolbarHero />
      <AboutSection />
      <ServicesSection />
      <DownloadAppSection />
      <AppUsageGuide />
      <Footer />
    </>
  );
}
