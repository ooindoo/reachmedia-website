import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import LogoBar from "./components/LogoBar";
import Quiz from "./components/Quiz";
import Services from "./components/Services";
import Results from "./components/Results";
import CtaRepeat from "./components/CtaRepeat";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Reach Media",
  "url": "https://reachmedia.it",
  "email": "info@reachmedia.it",
  "description": "Consulenza email marketing, Klaviyo automation e Shopify development per e-commerce premium italiani.",
  "founder": {
    "@type": "Person",
    "name": "Ardit Ndoja",
  },
  "areaServed": "IT",
  "serviceType": ["Email Marketing", "Klaviyo Automation", "Shopify Development"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Reach Media",
  "url": "https://reachmedia.it",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <main>
        <Navbar />
        <Hero />
        <StatsBar />
        <LogoBar />
        <Quiz />
        <Services />
        <Results />
        <CtaRepeat />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
