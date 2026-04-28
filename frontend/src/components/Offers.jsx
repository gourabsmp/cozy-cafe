import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gift, Sparkles, Tag } from 'lucide-react';
import { useCafe } from '../context/CafeContext';

gsap.registerPlugin(ScrollTrigger);

export default function Offers() {
  const { offers } = useCafe();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.offer-card', { 
        scale: 0.9, 
        opacity: 0, 
        y: 60, 
        duration: 1.2, 
        stagger: 0.2, 
        ease: 'power4.out', 
        scrollTrigger: { 
          trigger: sectionRef.current, 
          start: 'top 80%' 
        } 
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [offers]);

  if (!offers || offers.length === 0) return null;

  return (
    <section id="offers" ref={sectionRef} className="section-padding bg-cafe-cream relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-cafe-gold/5 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="section-label">Exclusives</span>
          <h2 className="section-title">Member Privileges</h2>
          <p className="max-w-2xl mx-auto text-cafe-muted italic mt-8">
            "Exceptional moments deserve exceptional rewards. Explore our current selections."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {offers.map((offer, index) => (
            <motion.article
              key={offer.id || index}
              className="offer-card product-card p-10 text-center flex flex-col items-center group interactive"
            >
              <div className="w-20 h-20 rounded-full bg-cafe-espresso flex items-center justify-center mb-8 text-cafe-gold shadow-2xl transition-transform duration-500 group-hover:scale-110">
                <Gift size={32} />
              </div>
              
              <div className="inline-flex items-center gap-2 rounded-full bg-cafe-gold/10 text-cafe-gold border border-cafe-gold/20 px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <Tag size={12} /> {offer.badge || 'Limited Edition'}
              </div>

              <h3 className="text-2xl font-serif font-black text-cafe-espresso mb-4 group-hover:text-cafe-gold transition-colors">
                {offer.title}
              </h3>
              
              <p className="text-cafe-muted leading-relaxed italic">
                "{offer.description}"
              </p>

              <div className="mt-8 pt-8 border-t border-cafe-gold/10 w-full">
                <button className="text-cafe-espresso font-black uppercase tracking-widest text-xs hover:text-cafe-gold transition-colors flex items-center gap-2 mx-auto">
                  Claim Privilege <Sparkles size={14} className="text-cafe-gold" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
