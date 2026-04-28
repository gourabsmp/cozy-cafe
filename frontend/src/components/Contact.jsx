import { MapPin, Phone, Clock, Mail, ExternalLink } from 'lucide-react';

export default function Contact({ cafeInfo }) {
  const phone = cafeInfo?.phone || '+1(56)88289017';
  const address = cafeInfo?.address || '8834 E 34 Rd #131\nCadillac, MI 49601';
  const mapQuery = encodeURIComponent(address.replace(/\n/g, ', '));

  return (
    <section id="contact" className="section-padding bg-cafe-cream relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cafe-gold/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="section-label">Connect</span>
          <h2 className="section-title">Visit the Sanctuary</h2>
          <p className="max-w-2xl mx-auto text-cafe-muted italic">
            "Whether it's a quick morning coffee or a quiet afternoon of work, we're here to welcome you."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Column: Info & Map */}
          <div className="space-y-8 flex flex-col">
            <div className="product-card p-10 bg-white shadow-xl flex-1">
              <h3 className="text-3xl font-serif font-black text-cafe-espresso mb-10">Cafe Information</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-xl bg-cafe-gold/10 flex items-center justify-center text-cafe-gold transition-all duration-500 group-hover:bg-cafe-gold group-hover:text-white">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-cafe-espresso text-sm uppercase tracking-[0.2em] mb-2">Our Location</h4>
                    <p className="text-cafe-muted leading-relaxed whitespace-pre-line font-medium text-sm">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-xl bg-cafe-gold/10 flex items-center justify-center text-cafe-gold transition-all duration-500 group-hover:bg-cafe-gold group-hover:text-white">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-cafe-espresso text-sm uppercase tracking-[0.2em] mb-2">Direct Line</h4>
                    <a href={`tel:${phone}`} className="text-cafe-muted text-lg font-serif italic hover:text-cafe-gold transition-colors interactive">{phone}</a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-xl bg-cafe-gold/10 flex items-center justify-center text-cafe-gold transition-all duration-500 group-hover:bg-cafe-gold group-hover:text-white">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-cafe-espresso text-sm uppercase tracking-[0.2em] mb-2">Hours</h4>
                    <div className="grid grid-cols-2 gap-x-6 text-sm mt-2">
                      <span className="text-cafe-muted">Mon - Fri</span>
                      <span className="text-cafe-espresso font-bold">7am - 8pm</span>
                      <span className="text-cafe-muted">Sat - Sun</span>
                      <span className="text-cafe-espresso font-bold">8am - 9pm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-64 w-full rounded-[2rem] overflow-hidden border border-cafe-gold/20 shadow-xl relative">
              <iframe
                title="Cozy Cafe Location"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-1000"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="product-card p-10 bg-white shadow-2xl flex flex-col justify-center border border-cafe-gold/10">
            <h3 className="text-3xl font-serif font-black text-cafe-espresso mb-10 text-center">Send a Message</h3>
            <form className="space-y-8">
              <div className="input-group">
                <input id="name" type="text" placeholder=" " required />
                <label htmlFor="name">Full Name</label>
              </div>
              <div className="input-group">
                <input id="email" type="email" placeholder=" " required />
                <label htmlFor="email">Email Address</label>
              </div>
              <div className="input-group">
                <textarea id="message" rows={5} placeholder=" " required></textarea>
                <label htmlFor="message">Your Message</label>
              </div>
              <button type="submit" className="btn-premium btn-premium-gold w-full justify-center py-5 text-lg interactive">
                <Mail size={20} /> Dispatch Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
