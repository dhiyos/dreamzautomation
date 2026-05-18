import Nav from '@/components/Nav';
import AboutHero from '@/components/sections/about/AboutHero';
import FoundersPedigree from '@/components/sections/about/FoundersPedigree';
import Story from '@/components/sections/about/Story';
import Timeline from '@/components/sections/about/Timeline';
import Stats from '@/components/sections/about/Stats';
import FacilityGrid from '@/components/sections/about/FacilityGrid';
import Certifications from '@/components/sections/Certifications';
import CtaStrip from '@/components/sections/CtaStrip';
import Footer from '@/components/sections/Footer';
import SEO from '@/components/shared/SEO';

const About = () => {
  return (
    <div className="min-h-screen bg-bg-primary">
      <SEO
        title="About Dreamz Automation — Founders, Facility & Pedigree"
        description="Twenty years of industrial automation out of Ghaziabad — founders' pedigree, company timeline, 10,000 sq. ft. facility, and ISO 9001 certification."
        path="/about"
      />
      <Nav />
      <main>
        <AboutHero />
        <FoundersPedigree />
        <Story />
        <Timeline />
        <Stats />
        <FacilityGrid />
        <Certifications />
        <CtaStrip />
      </main>
      <Footer />
    </div>
  );
};

export default About;
