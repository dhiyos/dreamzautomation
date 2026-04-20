import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustBar from "@/components/sections/TrustBar";
import CompanyProfile from "@/components/sections/CompanyProfile";
import Solutions from "@/components/sections/Solutions";
import Process from "@/components/sections/Process";

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
      </main>
    </div>
  );
};

export default Index;
