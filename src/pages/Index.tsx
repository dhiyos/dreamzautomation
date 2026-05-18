import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustBar from "@/components/sections/TrustBar";
import CompanyProfile from "@/components/sections/CompanyProfile";
import Solutions from "@/components/sections/Solutions";
import Process from "@/components/sections/Process";
import FeaturedCaseStudies from "@/components/sections/FeaturedCaseStudies";
import Engineers from "@/components/sections/Engineers";
import Founders from "@/components/sections/Founders";
import Certifications from "@/components/sections/Certifications";
import Testimonials from "@/components/sections/Testimonials";
import CtaStrip from "@/components/sections/CtaStrip";
import Footer from "@/components/sections/Footer";
import SEO from "@/components/shared/SEO";
import heroBg from "@/assets/hero-it-ot-convergence.jpg";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <div className="min-h-screen bg-bg-primary">
      <SEO
        title="Dreamz Automation — Siemens System Integrator"
        description="Siemens Authorized System House delivering DCS, PLC, SCADA, machine automation and IT-OT convergence across India since 2005."
        path="/"
      />
      <Helmet>
        <link rel="preload" as="image" href={heroBg} fetchpriority="high" />
      </Helmet>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <CompanyProfile />
        <Solutions />
        <Process />
        <FeaturedCaseStudies />
        <Engineers />
        <Certifications />
        <Testimonials />
        <Founders
          eyebrow="Insights & Commentary"
          eyebrowVariant="blue"
          heading="From the founders' desk."
          headingId="insights-heading"
        />
        <CtaStrip />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
