import { motion } from 'framer-motion';
import { Wifi, Armchair, Music2 } from 'lucide-react';

const experiences = [
  {
    icon: Armchair,
    title: 'Cozy Seating',
    desc: 'Comfortable seating made for long chats, focused work, and peaceful coffee breaks.'
  },
  {
    icon: Wifi,
    title: 'Free Fast WiFi',
    desc: 'Reliable high-speed internet for study sessions, meetings, and remote work.'
  },
  {
    icon: Music2,
    title: 'Chill Ambience',
    desc: 'Soft music and calm lighting create a warm atmosphere from morning to evening.'
  }
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-[#fffaf4] relative">
      <div className="container">
        <div className="section-header">
          <span className="section-label">More than coffee</span>
          <h2 className="section-title">Made for good vibes</h2>
          <p className="text-cafe-muted text-base md:text-lg leading-relaxed">
            A cozy place for coffee, food, work, and relaxed moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {experiences.map((exp, i) => {
            const Icon = exp.icon;
            return (
              <motion.article
                key={exp.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="product-card min-h-[150px] p-7 flex items-start gap-4 border border-cafe-gold/20 hover:border-cafe-gold/40"
              >
                <div className="shrink-0 w-16 h-16 rounded-full bg-cafe-gold/18 text-cafe-gold flex items-center justify-center border border-cafe-gold/35">
                  <Icon size={26} />
                </div>
                <div>
                  <h3 className="text-[1.45rem] font-serif font-bold text-cafe-espresso mb-1.5 leading-tight">{exp.title}</h3>
                  <p className="text-cafe-muted text-sm md:text-[0.95rem] leading-relaxed">{exp.desc}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
