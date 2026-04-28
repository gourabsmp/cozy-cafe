import { PhoneCall, MapPinned } from 'lucide-react';

export default function CTA({ cafeInfo }) {
  const phone = cafeInfo?.phone || '(555) 123-4567';
  const address = cafeInfo?.address || '123 Cafe Street, City, State 12345';
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.replace(/\n/g, ', '))}`;

  return (
    <section className="section-padding bg-[#1a120b] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,168,67,0.25),transparent_42%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(74,124,89,0.18),transparent_45%)]" />

      <div className="section-container text-center relative z-10 reveal">
        <h2 className="section-title light mb-6">Visit Cozy Cafe Today</h2>
        <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
          Fresh coffee, warm atmosphere, and your favorite corner to unwind.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href={`tel:${phone}`} className="btn-primary min-w-[220px] justify-center">
            <PhoneCall size={18} /> Call Now
          </a>
          <a href={mapUrl} target="_blank" rel="noreferrer" className="btn-outline min-w-[220px] justify-center">
            <MapPinned size={18} /> Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
