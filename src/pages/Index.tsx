import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustBar from "@/components/sections/TrustBar";
import CompanyProfile from "@/components/sections/CompanyProfile";

const Index = () => {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <CompanyProfile />
      </main>
    </div>
  );
};

export default Index;
