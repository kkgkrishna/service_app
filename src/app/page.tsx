import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import HeroSection from "@/components/HomeScreen/HeroSection";
import Toolbar from "@/components/HomeScreen/Toolbar";

export default function Home() {
  // redirect("/login");
  return (
    <>
      <Toolbar />
      {/* <HeroSection /> */}
    </>
  );
}
