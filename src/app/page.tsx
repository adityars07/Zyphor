import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BentoGrid from '@/components/BentoGrid';
import TrustBar from '@/components/TrustBar';
import Features from '@/components/Features';
import DeveloperAPI from '@/components/DeveloperAPI';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex-grow w-full">
      <Navbar />
      <Hero />
      <BentoGrid />
      <TrustBar />
      <Features />
      <DeveloperAPI />
      <CTA />
      <Footer />
    </main>
  );
}
