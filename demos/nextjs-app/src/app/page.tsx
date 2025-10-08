'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { QuickStartSection } from '@/components/sections/QuickStartSection';
import { Footer } from '@/components/layouts/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <QuickStartSection />
      <Footer />
    </div>
  );
}
