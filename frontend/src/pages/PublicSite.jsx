import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

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
import { ChevronUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PublicSite() {
  const { cafeInfo, loading } = useCafe();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Page Loader
    const timer = setTimeout(() => setIsLoaded(true), 1500);

    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Scroll Progress
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      const progressBar = document.getElementById('scroll-progress');
      if (progressBar) progressBar.style.width = `${scrollPercent}%`;
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);

    // Custom Cursor
    const moveCursor = (e) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out'
        });
      }
    };
    window.addEventListener('mousemove', moveCursor);

    // Cursor interaction
    const handlePointerEnter = () => {
      if (cursorRef.current) gsap.to(cursorRef.current, { scale: 3, opacity: 0.5 });
    };
    const handlePointerLeave = () => {
      if (cursorRef.current) gsap.to(cursorRef.current, { scale: 1, opacity: 1 });
    };

    const interactives = document.querySelectorAll('a, button, .interactive');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handlePointerEnter);
      el.addEventListener('mouseleave', handlePointerLeave);
    });

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', moveCursor);
      clearTimeout(timer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && !isLoaded) {
    return (
      <div id="page-loader">
        <div className="loader-content">
          <div className="loader-spinner mx-auto mb-4"></div>
          <p className="text-cafe-gold font-serif text-xl tracking-widest animate-pulse">COZY CAFE</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Background & Overlays */}
      <div className="grain-overlay" />
      <div id="scroll-progress" />
      <div id="custom-cursor" ref={cursorRef} />
      
      {/* Page Loader Initial Fade */}
      {!isLoaded && (
        <div id="page-loader" style={{ opacity: 1 }}>
          <div className="loader-content">
            <div className="loader-spinner mx-auto mb-4"></div>
            <p className="text-cafe-gold font-serif text-xl tracking-widest">COZY CAFE</p>
          </div>
        </div>
      )}

      <Navbar />
      
      <main>
        <Hero />
        <div className="section-divider" />
        <Experience cafeInfo={cafeInfo} />
        <div className="section-divider" />
        <MenuSection />
        <div className="section-divider" />
        <Gallery />
        <div className="section-divider" />
        <Offers />
        <div className="section-divider" />
        <Reviews />
        <div className="section-divider" />
        <Contact cafeInfo={cafeInfo} />
      </main>

      <Footer cafeInfo={cafeInfo} />

      {/* Back to Top */}
      <button 
        className={`back-to-top ${showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ChevronUp size={24} />
      </button>
    </div>
  );
}
