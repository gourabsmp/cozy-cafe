import { useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCafe } from '../context/CafeContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const fallbackReviews = [
  { id: 'f1', author: 'Sarah Mitchell', rating: 5, text: 'Cozy Cafe is my absolute sanctuary. The atmosphere is consistently warm, the baristas are experts, and the coffee quality is unrivaled in Cadillac.' },
  { id: 'f2', author: 'James Thorne', rating: 5, text: 'A truly premium experience. From the artisanal pastries to the high-speed fiber internet, it is the perfect place to focus and indulge.' },
  { id: 'f3', author: 'Emily Rivera', rating: 5, text: 'The attention to detail here is incredible. The pancake stack is a work of art, and the vibe is exactly what I need for my morning routine.' },
  { id: 'f4', author: 'David Lowery', rating: 5, text: 'Finally, a cafe that understands the importance of both quality coffee and a chill ambiance. This place is a gem!' }
];

export default function Reviews() {
  const { reviews } = useCafe();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const featuredReviews = reviews.filter((r) => r.featured);
  const sourceReviews = featuredReviews.length ? featuredReviews : fallbackReviews;

  return (
    <section id="reviews" className="section-padding bg-cafe-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">Echoes of Delight</h2>
          <div className="gold-divider mx-auto" />
          <p className="max-w-2xl mx-auto text-cafe-muted italic font-medium">
            "We take immense pride in the community we've built, one cup at a time."
          </p>
        </div>

        <div className="relative group">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.reviews-pagination' }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 3 }
            }}
            className="pb-20 !overflow-visible"
          >
            {sourceReviews.map((review) => (
              <SwiperSlide key={review.id}>
                <article className="product-card p-10 h-full flex flex-col relative bg-white border border-cafe-gold/10 hover:border-cafe-gold/30 interactive">
                  <Quote className="absolute top-8 right-10 text-cafe-gold/20" size={64} />
                  
                  <div className="flex gap-1 mb-8">
                    {[...Array(5)].map((_, index) => (
                      <Star 
                        key={index} 
                        size={18} 
                        fill={index < review.rating ? '#D4A843' : 'transparent'} 
                        className={index < review.rating ? 'text-cafe-gold' : 'text-cafe-gold/20'} 
                      />
                    ))}
                  </div>

                  <p className="text-cafe-espresso text-xl font-serif leading-relaxed italic mb-10 flex-1">
                    "{review.text}"
                  </p>

                  <div className="flex items-center gap-5 mt-auto">
                    <div className="w-14 h-14 rounded-full bg-cafe-espresso flex items-center justify-center text-cafe-gold font-black text-xl shadow-lg">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-cafe-espresso text-lg tracking-tight">{review.author}</h4>
                      <span className="text-[10px] text-cafe-gold font-black uppercase tracking-[0.2em]">Verified Aficionado</span>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <button 
            ref={prevRef}
            className="absolute left-[-2rem] top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full glass border border-cafe-gold/20 flex items-center justify-center text-cafe-espresso hover:bg-cafe-gold transition-all opacity-0 group-hover:opacity-100 hidden xl:flex interactive"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            ref={nextRef}
            className="absolute right-[-2rem] top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full glass border border-cafe-gold/20 flex items-center justify-center text-cafe-espresso hover:bg-cafe-gold transition-all opacity-0 group-hover:opacity-100 hidden xl:flex interactive"
          >
            <ChevronRight size={24} />
          </button>

          {/* Pagination */}
          <div className="reviews-pagination flex justify-center mt-8 gap-3" />
        </div>
      </div>
    </section>
  );
}
