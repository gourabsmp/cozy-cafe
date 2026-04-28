import { Coffee, Mail, MapPin, Phone, Camera } from 'lucide-react';

const quickLinks = ['Home', 'Experience', 'Menu', 'Gallery', 'Offers', 'Reviews', 'Contact'];

export default function Footer({ cafeInfo }) {
  return (
    <footer className="bg-[linear-gradient(180deg,#1a120b_0%,#130d08_100%)] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cafe-gold/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-[radial-gradient(ellipse_at_bottom,rgba(212,168,67,0.16),transparent_70%)] pointer-events-none" />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 md:gap-12 xl:gap-14 mb-12">
          <div>
            <a href="#hero" className="inline-flex items-center gap-3 text-3xl font-black mb-5 interactive">
              <div className="w-11 h-11 rounded-full bg-cafe-gold text-cafe-espresso flex items-center justify-center shadow-[0_10px_24px_rgba(212,168,67,0.35)]">
                <Coffee size={22} />
              </div>
              <span className="font-serif">{cafeInfo?.name || 'Cozy Cafe'}</span>
            </a>
            <p className="text-white/72 leading-relaxed text-sm md:text-base max-w-sm">
              Fresh coffee. Warm vibes. Cadillac's favorite spot.
            </p>
          </div>

          <div>
            <h4 className="text-cafe-gold font-black uppercase tracking-[0.2em] text-xs mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="footer-link text-white/75 hover:text-cafe-gold transition-colors text-sm md:text-base">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-cafe-gold font-black uppercase tracking-[0.2em] text-xs mb-5">Contact Info</h4>
            <ul className="space-y-4 text-sm md:text-base">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-cafe-gold shrink-0 mt-1" />
                <span className="text-white/75 whitespace-pre-line">{cafeInfo?.address || '8834 E 34 Rd #131\nCadillac, MI 49601'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-cafe-gold shrink-0" />
                <a href={`tel:${cafeInfo?.phone || '+1(56)88289017'}`} className="footer-link text-white/75 hover:text-cafe-gold transition-colors">
                  {cafeInfo?.phone || '+1(56)88289017'}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-cafe-gold shrink-0" />
                <span className="text-white/75">hello@cozycafe.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-cafe-gold font-black uppercase tracking-[0.2em] text-xs mb-5">Social</h4>
            <a
              href={cafeInfo?.instagram_url || 'https://instagram.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cafe-gold/45 px-5 py-2.5 text-cafe-gold hover:bg-cafe-gold hover:text-cafe-espresso transition-all"
            >
              <Camera size={16} /> Instagram
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-white/12 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/45 text-xs uppercase tracking-[0.16em]">© 2026 Cozy Cafe. All rights reserved.</p>
          <a href="/admin" className="footer-link text-white/45 hover:text-cafe-gold transition-colors text-xs uppercase tracking-[0.16em]">
            Admin Portal
          </a>
        </div>
      </div>
    </footer>
  );
}
