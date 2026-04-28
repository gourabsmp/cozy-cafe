import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowDown } from 'lucide-react';
import { useCafe } from '../context/CafeContext';

export default function Hero() {
  const { cafeInfo } = useCafe();
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    if (titleRef.current) {
      const chars = titleRef.current.innerText.split("");
      titleRef.current.innerHTML = chars.map(char => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`).join("");
      
      gsap.fromTo(".char", 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.05, 
          duration: 1, 
          ease: "power4.out",
          delay: 0.5
        }
      );
    }
  }, []);

  const scrollToMenu = () => {
    const element = document.querySelector('#menu');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={containerRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cafe-espresso">
      {/* Background with Parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0 scale-110"
      >
        <div 
          className="absolute inset-0 bg-gradient-to-b from-cafe-espresso/60 via-cafe-espresso/40 to-cafe-espresso/90 z-10"
        />
        <img 
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2200&q=80" 
          alt="Cafe Background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,168,67,0.15),transparent_50%)] z-0" />

      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6"
        >
          <span className="section-label !text-white/80 after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-[1px] after:bg-cafe-gold">
            Est. 2024 • Cadillac, MI
          </span>
        </motion.div>

        <h1 
          ref={titleRef}
          className="text-[clamp(3.5rem,10vw,8rem)] font-black text-white leading-[0.85] mb-8 overflow-hidden py-2"
          style={{ textShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
        >
          {cafeInfo.hero_title || 'Cozy Cafe'}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-medium leading-relaxed italic"
        >
          "{cafeInfo.hero_subtitle || 'Experience the perfect blend of warmth and flavor in every cup.'}"
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button 
            onClick={scrollToMenu}
            className="btn-premium btn-premium-gold text-lg px-12 py-5 interactive shadow-2xl"
          >
            Explore Menu
          </button>
          <a 
            href="#contact"
            className="text-white font-bold tracking-widest uppercase text-sm border-b-2 border-cafe-gold pb-1 hover:text-cafe-gold transition-colors interactive"
          >
            Visit Us
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-bold">Explore</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-12 bg-gradient-to-b from-cafe-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
