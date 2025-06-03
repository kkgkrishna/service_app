import { Inter } from "next/font/google";
import type { Metadata } from "next";
import BottomNav from "./components/bottom_nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home Services App",
  description: "Book cleaning, medical, car and other services nearby",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <div className="">{children}</div> */}
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
