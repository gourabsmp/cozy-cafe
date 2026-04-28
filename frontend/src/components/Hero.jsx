import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useCafe } from '../context/CafeContext';

export default function Hero() {
  const { cafeInfo } = useCafe();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 120]);
  const indicatorOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToMenu = () => {
    const element = document.querySelector('#menu');
    if (element) {
      window.scrollTo({ top: element.offsetTop - 88, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-cafe-espresso">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 scale-105">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2200&q=80"
          alt="Cafe background"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,11,7,0.62)_0%,rgba(17,11,7,0.70)_50%,rgba(17,11,7,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,168,67,0.20),transparent_52%)]" />
        <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(17,11,7,0.85)]" />
      </motion.div>

      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto pt-20 md:pt-16">
        <motion.span
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="section-label !text-cafe-gold"
        >
          FRESH COFFEE • WARM VIBES
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08 }}
          className="text-[clamp(2.8rem,11vw,8rem)] font-black text-white leading-[0.86] mt-2 mb-6 md:mb-7 tracking-tight"
          style={{ textShadow: '0 14px 38px rgba(0,0,0,0.34)' }}
        >
          {cafeInfo.hero_title || 'Cozy Cafe'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[0.98rem] md:text-xl text-white/82 max-w-2xl mx-auto mb-10 md:mb-11 leading-relaxed"
        >
          {cafeInfo.hero_subtitle || 'Experience the perfect blend of warmth and flavor in every cup.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 md:gap-4 w-full max-w-md sm:max-w-none mx-auto"
        >
          <button
            onClick={scrollToMenu}
            className="btn-premium bg-gradient-to-r from-[#d4a843] to-[#f0d48a] text-cafe-espresso text-sm md:text-base px-10 py-4 w-full sm:w-auto justify-center shadow-[0_14px_34px_rgba(212,168,67,0.34)] hover:scale-[1.03] hover:shadow-[0_18px_40px_rgba(212,168,67,0.42)] interactive"
          >
            View Menu
          </button>
          <a
            href="#contact"
            className="btn-premium border border-cafe-gold/70 text-white bg-white/5 backdrop-blur-[2px] text-sm md:text-base px-10 py-4 w-full sm:w-auto justify-center hover:scale-[1.03] hover:bg-cafe-gold/12 interactive"
          >
            Visit Us
          </a>
        </motion.div>
      </div>

      <motion.div style={{ opacity: indicatorOpacity }} className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.34em] uppercase text-cafe-gold/90 font-semibold">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-cafe-gold to-transparent" />
        <ChevronDown size={16} className="text-cafe-gold/90 animate-bounce" />
      </motion.div>
    </section>
  );
}
