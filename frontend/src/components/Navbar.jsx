import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setActive(href);
    setMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-[10005] w-[calc(100%-2rem)] max-w-6xl rounded-full transition-all duration-500",
        scrolled ? "glass py-3 px-6 shadow-2xl scale-95" : "bg-transparent py-5 px-8"
      )}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => handleNav('#hero')} 
          className="flex items-center gap-3 interactive"
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-cafe-gold text-cafe-espresso shadow-lg">
            <Coffee size={20} strokeWidth={2.5} />
          </div>
          <span className={cn(
            "font-serif text-2xl font-black tracking-tight transition-colors duration-300",
            scrolled ? "text-cafe-espresso" : "text-white"
          )}>
            Cozy Cafe
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 interactive",
                active === link.href 
                  ? "bg-cafe-gold text-cafe-espresso" 
                  : scrolled ? "text-cafe-espresso/70 hover:text-cafe-espresso hover:bg-cafe-gold/10" : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <button 
            onClick={() => handleNav('#contact')} 
            className="btn-premium btn-premium-gold text-sm py-2 px-6 shadow-xl interactive"
          >
            <MapPin size={16} /> Visit Us
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={cn(
            "lg:hidden p-2.5 rounded-full transition-colors interactive",
            scrolled ? "bg-cafe-gold/10 text-cafe-espresso" : "bg-white/10 text-white"
          )}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="lg:hidden absolute top-[calc(100%+1rem)] left-0 right-0 glass rounded-3xl p-6 shadow-2xl border border-cafe-gold/20"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={cn(
                    "w-full text-left px-5 py-4 rounded-2xl text-lg font-bold transition-all interactive",
                    active === link.href ? "bg-cafe-gold text-cafe-espresso" : "bg-cafe-brown/5 text-cafe-espresso hover:bg-cafe-gold/10"
                  )}
                >
                  {link.label}
                </button>
              ))}
              <button 
                onClick={() => handleNav('#contact')} 
                className="btn-premium btn-premium-gold justify-center mt-2 py-4 interactive"
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
