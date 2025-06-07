import type { Metadata } from "next";
import { Inter, Josefin_Sans } from "next/font/google";

import EngineerBottomMenubar from "./EngineerBottomMenubar";
import EngineerToolbar from "./EngineerToolbar";

const inter = Inter({ subsets: ["latin"] });

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-josefin",
});

export const metadata: Metadata = {
  title: "Home Services App",
  description: "Book cleaning, medical, car and other services nearby",
};

export default function EngineerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} ${josefin.variable}  font-josefin h-full w-full bg-gray-50 dark:bg-gray-900`}
      >
        <EngineerToolbar />
        <div className="min-h-screen w-full py-16">
          {" "}
          {/* reserve space for bottom bar */}
          {children}
        </div>
        <EngineerBottomMenubar />
      </body>
    </html>
  );
}
