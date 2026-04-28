import { motion } from 'framer-motion';
import { Gift, Sparkles, Tag } from 'lucide-react';
import { useCafe } from '../context/CafeContext';

export default function Offers() {
  const { offers } = useCafe();

  if (!offers || offers.length === 0) return null;

  return (
    <section id="offers" className="section-padding bg-[#fffaf4] relative overflow-hidden">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Exclusives</span>
          <h2 className="section-title">Member Privileges</h2>
          <p className="text-balance text-base leading-relaxed text-cafe-muted md:text-lg">
            Exceptional moments deserve exceptional rewards. Explore our current selections.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 xl:grid-cols-3">
          {offers.map((offer, index) => (
            <motion.article
              key={offer.id || index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="product-card flex min-h-[320px] flex-col items-center border border-cafe-gold/20 p-7 text-center group interactive md:p-8"
            >
              <div className="w-16 h-16 rounded-full bg-cafe-espresso flex items-center justify-center mb-6 text-cafe-gold shadow-lg">
                <Gift size={28} />
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-cafe-gold/10 text-cafe-gold border border-cafe-gold/30 px-4 py-1 text-[10px] font-black uppercase tracking-[0.18em] mb-5">
                <Tag size={12} /> {offer.badge || 'Limited Edition'}
              </div>

              <h3 className="mb-3 max-w-[16ch] text-center text-2xl font-serif font-black leading-tight text-cafe-espresso transition-colors group-hover:text-cafe-gold">
                {offer.title}
              </h3>

              <p className="mx-auto max-w-[30ch] text-center text-sm leading-relaxed text-cafe-muted md:text-base">
                {offer.description}
              </p>

              <button className="mt-auto flex items-center gap-2 pt-6 text-xs font-black uppercase tracking-[0.18em] text-cafe-espresso transition-colors hover:text-cafe-gold">
                Claim Privilege <Sparkles size={13} className="text-cafe-gold" />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
