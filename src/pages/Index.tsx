import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustBar from "@/components/sections/TrustBar";
import CompanyProfile from "@/components/sections/CompanyProfile";
import Solutions from "@/components/sections/Solutions";
import Process from "@/components/sections/Process";
import FeaturedCaseStudies from "@/components/sections/FeaturedCaseStudies";
import Founders from "@/components/sections/Founders";
import Certifications from "@/components/sections/Certifications";
import Testimonials from "@/components/sections/Testimonials";
import InsightsPreview from "@/components/sections/InsightsPreview";
import CtaStrip from "@/components/sections/CtaStrip";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <CompanyProfile />
        <Solutions />
        <Process />
        <FeaturedCaseStudies />
        <Founders />
        <Certifications />
        <Testimonials />
        <InsightsPreview />
        <CtaStrip />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
