import { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../lib/supabase';
import { fallbackCafeInfo, fallbackMenuItems, fallbackReviews, fallbackOffers } from '../data/fallback';

const CafeContext = createContext(null);

export const CafeProvider = ({ children }) => {
  const [cafeInfo, setCafeInfo] = useState(fallbackCafeInfo);
  const [menuItems, setMenuItems] = useState(fallbackMenuItems);
  const [reviews, setReviews] = useState(fallbackReviews);
  const [offers, setOffers] = useState(fallbackOffers);
  const [gallery, setGallery] = useState([]);
  const [theme, setTheme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [infoRes, menuRes, reviewsRes, offersRes, galleryRes, themeRes] = await Promise.allSettled([
          supabase.from('cafe_info').select('*').single(),
          supabase.from('menu_items').select('*').order('sort_order'),
          supabase.from('reviews').select('*').order('created_at'),
          supabase.from('offers').select('*').eq('active', true),
          supabase.from('gallery').select('*').order('sort_order'),
          supabase.from('theme_settings').select('*').single(),
        ]);

        if (infoRes.status === 'fulfilled' && infoRes.value.data) setCafeInfo(infoRes.value.data);
        if (menuRes.status === 'fulfilled' && menuRes.value.data?.length) setMenuItems(menuRes.value.data);
        if (reviewsRes.status === 'fulfilled' && reviewsRes.value.data?.length) setReviews(reviewsRes.value.data);
        if (offersRes.status === 'fulfilled' && offersRes.value.data?.length) setOffers(offersRes.value.data);
        if (galleryRes.status === 'fulfilled' && galleryRes.value.data) setGallery(galleryRes.value.data);
        if (themeRes.status === 'fulfilled' && themeRes.value.data) setTheme(themeRes.value.data);
      } catch (err) {
        console.warn('Supabase not configured, using fallback data');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <CafeContext.Provider value={{ cafeInfo, menuItems, reviews, offers, gallery, theme, loading, setMenuItems, setReviews, setOffers, setGallery, setCafeInfo }}>
      {children}
    </CafeContext.Provider>
  );
};

export const useCafe = () => {
  const ctx = useContext(CafeContext);
  if (!ctx) throw new Error('useCafe must be used within CafeProvider');
  return ctx;
};
