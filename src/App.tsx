import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Solutions from "./pages/Solutions.tsx";
import Industries from "./pages/Industries.tsx";
import CaseStudiesIndex from "./pages/CaseStudiesIndex.tsx";
import CaseStudyDetail from "./pages/CaseStudyDetail.tsx";
import InsightsIndex from "./pages/InsightsIndex.tsx";
import InsightDetail from "./pages/InsightDetail.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/case-studies" element={<CaseStudiesIndex />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/insights" element={<InsightsIndex />} />
          <Route path="/insights/:slug" element={<InsightDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
