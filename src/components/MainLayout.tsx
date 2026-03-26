"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfd]">
      <Navbar />
      <main className="flex-grow pt-16 animate-in fade-in duration-700">
        {children}
      </main>
      <Footer />
    </div>
  );
}
