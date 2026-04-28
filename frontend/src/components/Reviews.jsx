import { useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCafe } from '../context/CafeContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const fallbackReviews = [
  { id: 'f1', author: 'Sarah M.', rating: 5, text: 'Cozy Cafe is my go-to spot! The coffee is amazing and the vibe is perfect for studying or just relaxing.' },
  { id: 'f2', author: 'James T.', rating: 5, text: 'The best pastries in Cadillac! The staff is friendly and the atmosphere makes you want to stay all day.' },
  { id: 'f3', author: 'Emily R.', rating: 5, text: 'Super cozy place with great WiFi and delicious food. Highly recommend the pancake stack!' },
  { id: 'f4', author: 'David L.', rating: 5, text: 'Love the chill ambience and quality coffee. Cozy Cafe never disappoints!' }
];

export default function Reviews() {
  const { reviews } = useCafe();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const featuredReviews = reviews.filter((r) => r.featured);
  const sourceReviews = featuredReviews.length ? featuredReviews : fallbackReviews;

  return (
    <section id="reviews" className="section-padding bg-cafe-cream overflow-hidden">
      <div className="container">
        <div className="section-header !max-w-[48rem]">
          <span className="section-label">What Our Guests Say</span>
          <h2 className="section-title">Loved by our community</h2>
          <p className="text-cafe-muted text-base md:text-lg leading-relaxed">
            Honest feedback from regulars who come for the coffee and stay for the atmosphere.
          </p>
        </div>

        <div className="relative group">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1.02}
            pagination={{ clickable: true, el: '.reviews-pagination' }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              481: { slidesPerView: 1.12, spaceBetween: 16 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1200: { slidesPerView: 3, spaceBetween: 24 }
            }}
            className="pb-14 !overflow-visible"
          >
            {sourceReviews.map((review) => (
              <SwiperSlide key={review.id} className="h-auto">
                <article className="product-card h-full p-6 md:p-7 flex flex-col relative bg-white border border-cafe-gold/15 hover:border-cafe-gold/35 interactive">
                  <Quote className="absolute top-5 right-5 text-cafe-gold/20" size={42} />

                  <div className="flex gap-1.5 mb-4">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={15}
                        fill={index < review.rating ? '#D4A843' : 'transparent'}
                        className={index < review.rating ? 'text-cafe-gold' : 'text-cafe-gold/25'}
                      />
                    ))}
                  </div>

                  <p className="text-cafe-espresso text-[0.96rem] md:text-base leading-relaxed mb-6 flex-1">“{review.text}”</p>

                  <div className="flex items-center gap-3.5 mt-auto pt-4 border-t border-cafe-gold/15">
                    <div className="w-11 h-11 rounded-full bg-cafe-espresso flex items-center justify-center text-cafe-gold font-black text-base shadow-lg">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-cafe-espresso text-[0.98rem] tracking-tight">{review.author}</h4>
                      <span className="text-[10px] text-cafe-gold font-black uppercase tracking-[0.18em]">Verified Customer</span>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            ref={prevRef}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass border border-cafe-gold/25 flex items-center justify-center text-cafe-espresso hover:bg-cafe-gold transition-all opacity-0 group-hover:opacity-100 hidden xl:flex interactive"
            aria-label="Previous review"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            ref={nextRef}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass border border-cafe-gold/25 flex items-center justify-center text-cafe-espresso hover:bg-cafe-gold transition-all opacity-0 group-hover:opacity-100 hidden xl:flex interactive"
            aria-label="Next review"
          >
            <ChevronRight size={22} />
          </button>

          <div className="reviews-pagination flex justify-center mt-5 gap-3" />
        </div>
      </div>
    </section>
  );
}

