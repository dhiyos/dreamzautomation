import Nav from '@/components/Nav';
import AboutHero from '@/components/sections/about/AboutHero';
import Story from '@/components/sections/about/Story';
import Stats from '@/components/sections/about/Stats';
import FacilityGrid from '@/components/sections/about/FacilityGrid';
import Timeline from '@/components/sections/about/Timeline';
import Founders from '@/components/sections/Founders';
import Certifications from '@/components/sections/Certifications';
import CtaStrip from '@/components/sections/CtaStrip';
import Footer from '@/components/sections/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Nav />
      <main>
        <AboutHero />
        <Story />
        <Stats />
        <FacilityGrid />
        <Timeline />
        <Founders />
        <Certifications />
        <CtaStrip />
      </main>
      <Footer />
    </div>
  );
};

export default About;
