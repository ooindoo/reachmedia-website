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

export default function Home() {
  return (
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
  );
}
