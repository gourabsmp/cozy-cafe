import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { useCafe } from '../context/CafeContext';

const defaultGallery = [
  { id: '1', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200', alt: 'Cafe interior', span: 'md:col-span-2 md:row-span-2' },
  { id: '2', url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1200', alt: 'Coffee pouring', span: 'md:col-span-1 md:row-span-1' },
  { id: '3', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1200', alt: 'Latte art', span: 'md:col-span-1 md:row-span-1' },
  { id: '4', url: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&q=80&w=1200', alt: 'Pastries', span: 'md:col-span-1 md:row-span-2' },
  { id: '5', url: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=1200', alt: 'Barista', span: 'md:col-span-1 md:row-span-1' },
  { id: '6', url: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&q=80&w=1200', alt: 'Coffee beans', span: 'md:col-span-1 md:row-span-1' }
];

export default function Gallery() {
  const { gallery, cafeInfo } = useCafe();

  const displayImages = gallery && gallery.length > 0 ? gallery.map((img, i) => ({ ...img, span: defaultGallery[i % defaultGallery.length].span })) : defaultGallery;

  return (
    <section id="gallery" className="section-padding bg-[#1a120b] text-white overflow-hidden">
      <div className="container">
        <div className="text-center mb-12 md:mb-14">
          <span className="section-label !text-cafe-gold">Gallery</span>
          <h2 className="section-title !text-white">Inside Cozy Cafe</h2>
          <p className="max-w-2xl mx-auto text-white/70 text-base md:text-lg leading-relaxed mt-4">
            A visual taste of our space, food, and daily coffee rituals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[170px] md:auto-rows-[190px] gap-4 md:gap-5">
          {displayImages.slice(0, 6).map((img, index) => (
            <motion.article
              key={img.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`relative overflow-hidden rounded-2xl ${img.span || ''}`}
            >
              <img src={img.url} alt={img.alt || 'Gallery image'} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href={cafeInfo?.instagram_url || 'https://instagram.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium bg-gradient-to-r from-[#d4a843] to-[#f0d48a] text-cafe-espresso interactive"
          >
            <Camera size={18} /> Join us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
