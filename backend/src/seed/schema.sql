-- ============================================
-- Cozy Cafe Supabase SQL Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ADMINS
-- ============================================
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CAFE INFO (singleton)
-- ============================================
CREATE TABLE IF NOT EXISTS cafe_info (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT DEFAULT 'Cozy Cafe',
  location TEXT DEFAULT 'Cadillac, MI',
  address TEXT DEFAULT '8834 E 34 Rd #131\nCadillac, MI 49601',
  phone TEXT DEFAULT '+1(56)88289017',
  hero_title TEXT DEFAULT 'Cozy Cafe',
  hero_subtitle TEXT DEFAULT 'Fresh coffee. Warm vibes. Cadillac''s favorite spot.',
  concept TEXT DEFAULT 'Cozy spot for coffee, food, and chill vibes',
  target_audience TEXT DEFAULT 'Students, professionals, locals',
  menu_description TEXT DEFAULT 'Coffee, tea, pastries, snacks, light meals',
  ambiance TEXT DEFAULT 'WiFi, comfy seating, good lighting',
  marketing TEXT DEFAULT 'Social media, loyalty programs, even',
  logo_url TEXT,
  facebook_url TEXT DEFAULT '',
  instagram_url TEXT DEFAULT '',
  twitter_url TEXT DEFAULT '',
  tiktok_url TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MENU ITEMS
-- ============================================
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  available BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- REVIEWS
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  author TEXT UNIQUE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  avatar_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- OFFERS
-- ============================================
CREATE TABLE IF NOT EXISTS offers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  badge TEXT,
  image_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- GALLERY
-- ============================================
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  url TEXT NOT NULL,
  caption TEXT,
  alt TEXT,
  bucket TEXT DEFAULT 'cafe-images',
  storage_path TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- THEME SETTINGS (singleton)
-- ============================================
CREATE TABLE IF NOT EXISTS theme_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  primary_color TEXT DEFAULT '#6B3F1F',
  accent_color TEXT DEFAULT '#D4A843',
  bg_color TEXT DEFAULT '#FFF8F0',
  text_color TEXT DEFAULT '#2C1A0E',
  green_color TEXT DEFAULT '#4A7C59',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ANIMATION SETTINGS (singleton)
-- ============================================
CREATE TABLE IF NOT EXISTS animation_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  enabled BOOLEAN DEFAULT true,
  speed TEXT DEFAULT 'normal',
  hero_style TEXT DEFAULT 'fade-up',
  card_style TEXT DEFAULT 'stagger',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SOCIAL LINKS (part of cafe_info now, but kept for flexibility)
-- ============================================

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- All tables: public read, no public write
ALTER TABLE cafe_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE theme_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE animation_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read cafe_info" ON cafe_info FOR SELECT USING (true);
CREATE POLICY "Public read menu_items" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public read offers" ON offers FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public read theme_settings" ON theme_settings FOR SELECT USING (true);
CREATE POLICY "Public read animation_settings" ON animation_settings FOR SELECT USING (true);

-- Admins: service role bypasses RLS (no extra policy needed for backend)
-- But allow service role full access:
CREATE POLICY "Service role full access admins" ON admins USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access cafe_info" ON cafe_info USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role full access menu_items" ON menu_items USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role full access reviews" ON reviews USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role full access offers" ON offers USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role full access gallery" ON gallery USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role full access theme_settings" ON theme_settings USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role full access animation_settings" ON animation_settings USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- STORAGE BUCKETS
-- (Run these or create via Supabase Dashboard > Storage)
-- ============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('cafe-images', 'cafe-images', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('menu-images', 'menu-images', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true) ON CONFLICT DO NOTHING;

-- Storage policies (public read)
CREATE POLICY "Public read cafe-images" ON storage.objects FOR SELECT USING (bucket_id = 'cafe-images');
CREATE POLICY "Public read menu-images" ON storage.objects FOR SELECT USING (bucket_id = 'menu-images');
CREATE POLICY "Public read gallery" ON storage.objects FOR SELECT USING (bucket_id = 'gallery');

-- Service role write for storage
CREATE POLICY "Service role write cafe-images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'cafe-images' AND auth.role() = 'service_role');
CREATE POLICY "Service role write menu-images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'menu-images' AND auth.role() = 'service_role');
CREATE POLICY "Service role write gallery" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'service_role');
CREATE POLICY "Service role delete cafe-images" ON storage.objects FOR DELETE USING (bucket_id = 'cafe-images' AND auth.role() = 'service_role');
CREATE POLICY "Service role delete menu-images" ON storage.objects FOR DELETE USING (bucket_id = 'menu-images' AND auth.role() = 'service_role');
CREATE POLICY "Service role delete gallery" ON storage.objects FOR DELETE USING (bucket_id = 'gallery' AND auth.role() = 'service_role');
