import { motion } from 'framer-motion';
import { Gift, Sparkles, Tag } from 'lucide-react';
import { useCafe } from '../context/CafeContext';

export default function Offers() {
  const { offers } = useCafe();

  if (!offers || offers.length === 0) return null;

  return (
    <section id="offers" className="section-padding bg-[#fffaf4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-14">
          <span className="section-label">Exclusives</span>
          <h2 className="section-title">Member Privileges</h2>
          <p className="max-w-2xl mx-auto text-cafe-muted mt-4 text-base md:text-lg leading-relaxed">
            Exceptional moments deserve exceptional rewards. Explore our current selections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {offers.map((offer, index) => (
            <motion.article
              key={offer.id || index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="product-card p-7 md:p-8 text-center flex flex-col items-center group interactive border border-cafe-gold/20"
            >
              <div className="w-16 h-16 rounded-full bg-cafe-espresso flex items-center justify-center mb-6 text-cafe-gold shadow-lg">
                <Gift size={28} />
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-cafe-gold/10 text-cafe-gold border border-cafe-gold/30 px-4 py-1 text-[10px] font-black uppercase tracking-[0.18em] mb-5">
                <Tag size={12} /> {offer.badge || 'Limited Edition'}
              </div>

              <h3 className="text-2xl font-serif font-black text-cafe-espresso mb-3 group-hover:text-cafe-gold transition-colors">{offer.title}</h3>

              <p className="text-cafe-muted leading-relaxed text-sm md:text-base">{offer.description}</p>

              <button className="mt-6 text-cafe-espresso font-black uppercase tracking-widest text-xs hover:text-cafe-gold transition-colors flex items-center gap-2">
                Claim Privilege <Sparkles size={13} className="text-cafe-gold" />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
