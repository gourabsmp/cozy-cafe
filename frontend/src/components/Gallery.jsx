import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCafe } from '../context/CafeContext';
import { Camera, Maximize2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const defaultGallery = [
  { id: '1', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=900', alt: 'Cafe interior', span: 'col-span-2 row-span-2' },
  { id: '2', url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=900', alt: 'Coffee pouring', span: 'col-span-1 row-span-1' },
  { id: '3', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=900', alt: 'Latte art', span: 'col-span-1 row-span-1' },
  { id: '4', url: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&q=80&w=900', alt: 'Pastries', span: 'col-span-1 row-span-2' },
  { id: '5', url: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=900', alt: 'Barista', span: 'col-span-1 row-span-1' },
  { id: '6', url: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&q=80&w=900', alt: 'Coffee beans', span: 'col-span-1 row-span-1' }
];

export default function Gallery() {
  const { gallery, cafeInfo } = useCafe();
  const sectionRef = useRef(null);
  const imagesRef = useRef([]);
  
  const displayImages = gallery && gallery.length > 0 
    ? gallery.map((img, i) => ({ ...img, span: defaultGallery[i % defaultGallery.length].span })) 
    : defaultGallery;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imagesRef.current, {
        scale: 1.2,
        opacity: 0,
        y: 100,
        stagger: 0.1,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [displayImages]);

  return (
    <section id="gallery" ref={sectionRef} className="section-padding bg-cafe-espresso text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label !text-cafe-gold">Visuals</span>
          <h2 className="section-title !text-white">Captured Moments</h2>
          <div className="gold-divider mx-auto" />
          <p className="max-w-2xl mx-auto text-white/60 italic font-medium">
            Explore the beauty of Cadillac's favorite sanctuary through our lens.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-4 md:gap-6 h-[800px]">
          {displayImages.slice(0, 6).map((img, index) => (
            <div 
              key={img.id} 
              ref={(el) => (imagesRef.current[index] = el)} 
              className={`relative overflow-hidden rounded-[2rem] group interactive bg-cafe-brown/20 ${img.span}`}
            >
              <img 
                src={img.url} 
                alt={img.alt || 'Gallery image'} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                loading="lazy" 
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-cafe-espresso/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-cafe-gold flex items-center justify-center mb-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                  <Maximize2 size={24} className="text-cafe-gold" />
                </div>
                <p className="text-cafe-gold font-bold tracking-[0.2em] uppercase text-xs translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  {img.alt || 'View Large'}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a 
            href={cafeInfo?.instagram_url || "https://instagram.com"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-premium btn-premium-gold interactive"
          >
            <Camera size={20} /> Join us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
