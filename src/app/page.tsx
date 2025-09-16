import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import AdvantagesSection from '@/components/sections/AdvantagesSection';
import MediaSection from '@/components/sections/MediaSection';
import ConsultationSection from '@/components/sections/ConsultationSection';
import ContactsSection from '@/components/sections/ContactsSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <AdvantagesSection />
      <MediaSection />
      <ConsultationSection />
      <ContactsSection />
    </div>
  );
}
