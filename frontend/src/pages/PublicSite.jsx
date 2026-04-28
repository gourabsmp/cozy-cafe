import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import MenuSection from '../components/MenuSection';
import Gallery from '../components/Gallery';
import Offers from '../components/Offers';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { useCafe } from '../context/CafeContext';

export default function PublicSite() {
  const { cafeInfo } = useCafe();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100;
      const progressBar = document.getElementById('scroll-progress');
      if (progressBar) progressBar.style.width = `${scrollPercent}%`;
      setShowBackToTop(window.scrollY > 460);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="relative bg-cafe-cream">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="grain-overlay" />
      <div id="scroll-progress" />

      <Navbar />

      <main id="main-content">
        <Hero />
        <Experience cafeInfo={cafeInfo} />
        <MenuSection />
        <Gallery />
        <Offers />
        <Reviews />
        <Contact cafeInfo={cafeInfo} />
      </main>

      <Footer cafeInfo={cafeInfo} />

      <button
        className={`back-to-top ${showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ChevronUp size={22} />
      </button>
    </div>
  );
}
