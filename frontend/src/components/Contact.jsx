import { MapPin, Phone, Clock, Mail, Navigation } from 'lucide-react';

export default function Contact({ cafeInfo }) {
  const phone = cafeInfo?.phone || '+1(56)88289017';
  const address = cafeInfo?.address || '8834 E 34 Rd #131\nCadillac, MI 49601';
  const mapQuery = encodeURIComponent(address.replace(/\n/g, ', '));

  return (
    <section id="contact" className="bg-white overflow-hidden">
      <div className="container py-20">
        <div className="text-center mb-12 md:mb-14">
          <span className="section-label">Contact</span>
          <h2 className="section-title">Visit Cozy Cafe Today</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <article className="rounded-2xl bg-[#fffdf8] border border-cafe-gold/20 shadow-[0_18px_38px_rgba(30,20,12,0.10)] p-8">
            <h3 className="text-3xl font-serif font-bold text-cafe-espresso mb-2">Visit Cozy Cafe</h3>
            <p className="text-cafe-muted text-base leading-relaxed mb-8">
              Come experience fresh coffee and warm vibes in Cadillac.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-cafe-gold/15 text-cafe-gold flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] font-bold text-cafe-gold mb-1">Address</p>
                  <p className="text-cafe-muted whitespace-pre-line leading-relaxed">{address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-cafe-gold/15 text-cafe-gold flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] font-bold text-cafe-gold mb-1">Phone</p>
                  <a href={`tel:${phone}`} className="text-cafe-espresso font-semibold hover:text-cafe-gold transition-colors">
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-cafe-gold/15 text-cafe-gold flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] font-bold text-cafe-gold mb-1">Hours</p>
                  <p className="text-cafe-muted text-sm">Mon-Fri: <span className="text-cafe-espresso font-semibold">7am-8pm</span></p>
                  <p className="text-cafe-muted text-sm">Sat-Sun: <span className="text-cafe-espresso font-semibold">8am-9pm</span></p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${phone}`}
                className="btn-premium bg-gradient-to-r from-[#d4a843] to-[#f0d48a] text-cafe-espresso justify-center py-3.5 shadow-[0_12px_30px_rgba(212,168,67,0.35)] hover:shadow-[0_16px_34px_rgba(212,168,67,0.45)]"
              >
                <Phone size={18} /> Call Now
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium border border-cafe-gold text-cafe-espresso justify-center py-3.5 hover:bg-cafe-gold hover:text-cafe-espresso"
              >
                <Navigation size={18} /> Get Directions
              </a>
            </div>
          </article>

          <article className="rounded-2xl bg-white border border-cafe-gold/20 shadow-[0_18px_38px_rgba(30,20,12,0.10)] overflow-hidden">
            <div className="p-5 md:p-6 pb-0">
              <div className="relative h-64 rounded-2xl border border-cafe-gold/20 overflow-hidden group">
                <iframe
                  title="Cozy Cafe Location"
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cafe-espresso/35 to-transparent transition-opacity duration-300 group-hover:opacity-0 pointer-events-none" />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 btn-premium bg-white/85 text-cafe-espresso px-4 py-2 text-xs border border-white/70 hover:bg-white"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

            <div className="p-6 md:p-7">
              <h3 className="text-2xl font-serif font-bold text-cafe-espresso mb-5 text-center">Send a Message</h3>
              <form className="space-y-4">
                <div className="input-group">
                  <input id="name" type="text" placeholder=" " required />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="input-group">
                  <input id="email" type="email" placeholder=" " required />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-group">
                  <input id="phone" type="tel" placeholder=" " />
                  <label htmlFor="phone">Phone</label>
                </div>
                <div className="input-group">
                  <textarea id="message" rows={4} placeholder=" " required></textarea>
                  <label htmlFor="message">Message</label>
                </div>
                <button
                  type="submit"
                  className="btn-premium bg-gradient-to-r from-[#d4a843] to-[#f0d48a] text-cafe-espresso w-full justify-center py-3.5 shadow-[0_12px_30px_rgba(212,168,67,0.35)] hover:shadow-[0_16px_34px_rgba(212,168,67,0.45)]"
                >
                  <Mail size={18} /> Submit Message
                </button>
              </form>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
