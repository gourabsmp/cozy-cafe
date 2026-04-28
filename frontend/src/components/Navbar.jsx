import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Coffee, MapPin } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Experience', href: '#experience' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Offers', href: '#offers' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('#hero');

  const sectionIds = useMemo(() => navLinks.map((l) => l.href), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onScrollSpy = () => {
      const mid = window.scrollY + window.innerHeight * 0.35;
      let current = '#hero';
      for (const id of sectionIds) {
        const el = document.querySelector(id);
        if (!el) continue;
        if (mid >= el.offsetTop) current = id;
      }
      setActive(current);
    };

    onScrollSpy();
    window.addEventListener('scroll', onScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', onScrollSpy);
  }, [sectionIds]);

  const handleNav = (href) => {
    setActive(href);
    setMenuOpen(false);
    const element = document.querySelector(href);
    if (!element) return;
    const offset = 92;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-1rem)] sm:w-[calc(100%-1.5rem)] md:w-[calc(100%-2.25rem)] max-w-[1280px] transition-all duration-300',
        'rounded-2xl border shadow-[0_18px_40px_rgba(17,11,7,0.28)]',
        scrolled
          ? 'bg-[rgba(20,12,6,0.78)] border-cafe-gold/45 backdrop-blur-xl'
          : 'bg-[rgba(20,12,6,0.68)] border-cafe-gold/30 backdrop-blur-lg'
      )}
    >
      <div className="flex items-center justify-between h-16 md:h-[72px] px-3.5 sm:px-4 md:px-6">
        <button onClick={() => handleNav('#hero')} className="flex items-center gap-2.5 interactive">
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-cafe-gold text-cafe-espresso shadow-lg">
            <Coffee size={18} strokeWidth={2.4} />
          </div>
          <span className="font-serif text-[1.18rem] sm:text-[1.3rem] md:text-[1.55rem] font-bold text-white leading-none">Cozy Cafe</span>
        </button>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={cn(
                  'relative px-4 py-2.5 min-h-12 text-sm font-semibold rounded-xl transition-colors duration-300 interactive',
                  isActive ? 'text-cafe-gold' : 'text-white/85 hover:text-white'
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute left-4 right-4 bottom-1 h-[2px] rounded-full transition-all duration-300',
                    isActive ? 'bg-cafe-gold opacity-100' : 'bg-transparent opacity-0'
                  )}
                />
              </button>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <button
            onClick={() => handleNav('#contact')}
            className="btn-premium bg-gradient-to-r from-[#d4a843] to-[#f0d48a] text-cafe-espresso text-sm py-2.5 px-6 min-h-12 shadow-[0_12px_28px_rgba(212,168,67,0.34)] interactive"
          >
            <MapPin size={16} /> Visit Us
          </button>
        </div>

        <button
          className="lg:hidden p-2.5 rounded-xl bg-white/8 text-white border border-white/10 interactive"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="lg:hidden border-t border-white/10 px-4 pb-4 pt-3 bg-[rgba(20,12,6,0.78)] rounded-b-2xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={cn(
                    'w-full text-left px-4 py-3 min-h-12 rounded-xl text-base font-semibold transition-all duration-300 interactive',
                    active === link.href ? 'bg-cafe-gold text-cafe-espresso' : 'text-white/90 bg-white/5'
                  )}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('#contact')}
                className="btn-premium bg-gradient-to-r from-[#d4a843] to-[#f0d48a] text-cafe-espresso justify-center mt-2 py-3.5 w-full"
              >
                <MapPin size={18} /> Visit Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
