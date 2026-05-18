"use client";

import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { NewsSection } from "@/components/home/NewsSection";
import { Contacts } from "@/components/contacts";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-white flex flex-col transition-colors duration-300">
      {/* Translucent premium header */}
      <Header />
      
      {/* Landing page sections */}
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <NewsSection />
        <Contacts />
      </main>

      {/* Styled Footer */}
      <Footer />
    </div>
  );
}
