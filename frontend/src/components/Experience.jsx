import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Coffee, Wifi, Armchair, Music, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  { 
    icon: <Armchair size={32} />, 
    title: 'Cozy Seating', 
    desc: 'Sink into our plush armchairs and sofas, curated for maximum comfort and long conversations.' 
  },
  { 
    icon: <Wifi size={32} />, 
    title: 'High-Speed Fiber', 
    desc: 'Gigabit internet connectivity throughout the cafe, making it the premier destination for digital nomads.' 
  },
  { 
    icon: <Music size={32} />, 
    title: 'Curated Sound', 
    desc: 'An acoustic experience designed to inspire, with a custom playlist that evolves throughout the day.' 
  }
];

export default function Experience({ cafeInfo }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Reveal
      gsap.from(".experience-header > *", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // Cards Stagger
      gsap.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.95,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section-padding bg-cafe-cream relative">
      {/* Decorative Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cafe-gold/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="experience-header text-center mb-16">
          <span className="section-label">Our Philosophy</span>
          <h2 className="section-title">The Art of Relaxation</h2>
          <div className="gold-divider mx-auto" />
          <p className="max-w-2xl mx-auto text-lg text-cafe-muted italic">
            {cafeInfo?.concept || "A sanctuary for coffee lovers, professionals, and dreamers."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, i) => (
            <div 
              key={i} 
              ref={(el) => (cardsRef.current[i] = el)}
              className="product-card group p-10 flex flex-col items-center text-center interactive"
            >
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 text-cafe-brown bg-cafe-gold/10 border border-cafe-gold/20 transition-all duration-500 group-hover:bg-cafe-gold group-hover:text-cafe-espresso group-hover:rotate-12">
                {exp.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-cafe-espresso font-serif">
                {exp.title}
              </h3>
              <p className="text-cafe-muted leading-relaxed">
                {exp.desc}
              </p>
              
              <div className="mt-8 w-12 h-[1px] bg-cafe-gold/30 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
