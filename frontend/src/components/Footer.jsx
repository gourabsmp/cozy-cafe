import { Coffee, Mail, MapPin, Phone, Camera } from 'lucide-react';

export default function Footer({ cafeInfo }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cafe-espresso text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cafe-gold/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-4 text-3xl font-black mb-8 group interactive">
              <div className="w-12 h-12 rounded-full bg-cafe-gold flex items-center justify-center text-cafe-espresso transition-transform duration-500 group-hover:rotate-[360deg]">
                <Coffee size={24} />
              </div>
              <span className="font-serif tracking-tighter">{cafeInfo?.name || 'Cozy Cafe'}</span>
            </a>
            <p className="text-white/60 mb-8 leading-relaxed italic">
              {cafeInfo?.hero_subtitle || 'Crafting Cadillac\'s finest coffee experience since 2024.'}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full glass-dark flex items-center justify-center text-cafe-gold hover:bg-cafe-gold hover:text-cafe-espresso transition-all duration-300 interactive">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-dark flex items-center justify-center text-cafe-gold hover:bg-cafe-gold hover:text-cafe-espresso transition-all duration-300 interactive">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-dark flex items-center justify-center text-cafe-gold hover:bg-cafe-gold hover:text-cafe-espresso transition-all duration-300 interactive">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-cafe-gold font-black uppercase tracking-[0.2em] text-xs mb-10">Exploration</h4>
            <ul className="space-y-4">
              {['Home', 'Experience', 'Menu', 'Gallery', 'Reviews'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`} 
                    className="text-white/70 hover:text-cafe-gold transition-colors duration-300 font-medium flex items-center gap-2 group interactive"
                  >
                    <span className="w-0 h-px bg-cafe-gold transition-all duration-300 group-hover:w-4" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-cafe-gold font-black uppercase tracking-[0.2em] text-xs mb-10">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin size={20} className="text-cafe-gold shrink-0" />
                <span className="text-white/70 text-sm leading-relaxed whitespace-pre-line">
                  {cafeInfo?.address || '8834 E 34 Rd #131\nCadillac, MI 49601'}
                </span>
              </li>
              <li className="flex gap-4">
                <Phone size={20} className="text-cafe-gold shrink-0" />
                <a href={`tel:${cafeInfo?.phone}`} className="text-white/70 hover:text-cafe-gold transition-colors font-medium interactive">
                  {cafeInfo?.phone || '+1(56)88289017'}
                </a>
              </li>
              <div className="mt-4">
                <a 
                  href={cafeInfo?.instagram_url || "https://instagram.com"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-cafe-gold hover:text-white transition-colors"
                >
                  <Camera size={20} /> Join us on Instagram
                </a>
              </div>
              <li className="flex gap-4">
                <Mail size={20} className="text-cafe-gold shrink-0" />
                <span className="text-white/70 font-medium">hello@cozycafe.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Legal */}
          <div>
            <h4 className="text-cafe-gold font-black uppercase tracking-[0.2em] text-xs mb-10">Admin & Legal</h4>
            <ul className="space-y-4">
              <li><a href="/admin" className="text-white/70 hover:text-cafe-gold transition-colors font-medium interactive">Administrative Portal</a></li>
              <li><a href="#" className="text-white/70 hover:text-cafe-gold transition-colors font-medium interactive">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-cafe-gold transition-colors font-medium interactive">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-xs font-bold tracking-widest uppercase">
            &copy; {currentYear} {cafeInfo?.name || 'Cozy Cafe'}. Crafted with Precision.
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] text-white/20 uppercase tracking-[0.3em]">Design By Antigravity</span>
            <span className="text-[10px] text-white/20 uppercase tracking-[0.3em]">Built in Michigan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
