import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const cafeInfo = {
  name: 'Cozy Cafe',
  location: 'Cadillac, MI',
  address: '8834 E 34 Rd #131\nCadillac, MI 49601',
  phone: '+1(56)88289017',
  hero_title: 'Cozy Cafe',
  hero_subtitle: "Fresh coffee. Warm vibes. Cadillac's favorite spot.",
  concept: 'Cozy spot for coffee, food, and chill vibes',
  target_audience: 'Students, professionals, locals',
  menu_description: 'Coffee, tea, pastries, snacks, light meals',
  ambiance: 'WiFi, comfy seating, good lighting',
  marketing: 'Social media, loyalty programs, even',
  logo_url: null,
  facebook_url: '',
  instagram_url: '',
  twitter_url: '',
  tiktok_url: ''
};

const menuItems = [
  { name: 'Butter Croissant',    category: 'Pastries',   price: '$200',    description: 'Golden flaky butter croissant', sort_order: 1,  available: true },
  { name: 'Chocolate Croissant', category: 'Pastries',   price: '$,500',   description: 'Rich chocolate-filled croissant', sort_order: 2,  available: true },
  { name: 'Cinnamon Roll',       category: 'Pastries',   price: '$,300',   description: 'Soft cinnamon roll with glaze', sort_order: 3,  available: true },
  { name: 'Banana Bread Slice',  category: 'Pastries',   price: '$1,000',  description: 'Moist banana bread slice', sort_order: 4,  available: true },
  { name: 'Blueberry Muffin',    category: 'Pastries',   price: '$1,200',  description: 'Fresh blueberry muffin', sort_order: 5,  available: true },
  { name: 'Cheese Danish',       category: 'Pastries',   price: '$1,400',  description: 'Creamy cheese danish pastry', sort_order: 6,  available: true },
  { name: 'Toast & Jam',         category: 'Breakfast',  price: '$900',    description: 'Toasted bread with assorted jam', sort_order: 7,  available: true },
  { name: 'Pancake Stack',       category: 'Breakfast',  price: '$800',    description: 'Fluffy pancake stack with syrup', sort_order: 8,  available: true },
  { name: 'Club Sandwich',       category: 'Sandwiches', price: '$,500',   description: 'Classic club sandwich', sort_order: 9,  available: true },
  { name: 'Chicken Sandwich',    category: 'Sandwiches', price: '$200',    description: 'Grilled chicken sandwich', sort_order: 10, available: true },
  { name: 'Veggie Sandwich',     category: 'Sandwiches', price: '$100',    description: 'Fresh vegetable sandwich', sort_order: 11, available: true },
  { name: 'Beef Burger',         category: 'Burgers',    price: '$500',    description: 'Juicy beef burger', sort_order: 12, available: true },
  { name: 'Chicken Burger',      category: 'Burgers',    price: '$800',    description: 'Crispy chicken burger', sort_order: 13, available: true },
  { name: 'French Fries',        category: 'Sides',      price: '$500',    description: 'Crispy golden french fries', sort_order: 14, available: true },
  { name: 'Meat Pie',            category: 'Snacks',     price: '$800',    description: 'Savory meat pie', sort_order: 15, available: true },
  { name: 'Sausage Roll',        category: 'Snacks',     price: '$700',    description: 'Flaky sausage roll', sort_order: 16, available: true },
  { name: 'Spring Rolls',        category: 'Snacks',     price: '$200',    description: 'Crispy spring rolls', sort_order: 17, available: true },
];

const reviews = [
  { author: 'Sarah M.', rating: 5, text: 'Absolutely love this place! The croissants are amazing and the vibe is so cozy. My go-to spot every morning!', featured: true },
  { author: 'James K.', rating: 5, text: 'Best coffee in Cadillac by far. Great WiFi, comfortable seating — perfect for working remotely.', featured: true },
  { author: 'Priya L.', rating: 4, text: 'The ambiance is incredible. Feels like a little escape from the city. The pastries are to die for!', featured: true },
  { author: 'Marcus T.', rating: 5, text: 'Friendly staff, amazing food, and the loyalty program is such a nice touch. Highly recommend!', featured: false },
  { author: 'Emily R.', rating: 5, text: 'I brought my study group here and we stayed for hours. Super welcoming and the coffee is perfection.', featured: false },
];

const offers = [
  { title: 'Morning Deal', description: 'Get 20% off any pastry with your morning coffee before 10am', badge: 'Limited Time', active: true },
  { title: 'Loyalty Rewards', description: 'Buy 5 coffees, get your 6th FREE with our loyalty card program', badge: 'Members', active: true },
  { title: 'Student Special', description: 'Show your student ID for a 10% discount on all orders', badge: 'Students', active: true },
];

const themeSettings = {
  primary_color: '#6B3F1F',
  accent_color: '#D4A843',
  bg_color: '#FFF8F0',
  text_color: '#2C1A0E',
  green_color: '#4A7C59'
};

const animationSettings = {
  enabled: true,
  speed: 'normal',
  hero_style: 'fade-up',
  card_style: 'stagger'
};

async function seed() {
  console.log('🌱 Starting seed...');

  // Admin
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 12);
  const { error: adminErr } = await supabase.from('admins').upsert(
    [{ username: process.env.ADMIN_USERNAME || 'admin', password_hash: passwordHash }],
    { onConflict: 'username' }
  );
  if (adminErr) console.error('Admin seed error:', adminErr.message);
  else console.log('✅ Admin seeded');

  // Cafe Info
  const { error: cafeErr } = await supabase.from('cafe_info').upsert([cafeInfo]);
  if (cafeErr) console.error('Cafe info seed error:', cafeErr.message);
  else console.log('✅ Cafe info seeded');

  // Menu Items
  const { error: menuErr } = await supabase.from('menu_items').upsert(menuItems, { onConflict: 'name' });
  if (menuErr) console.error('Menu seed error:', menuErr.message);
  else console.log(`✅ ${menuItems.length} menu items seeded`);

  // Reviews
  const { error: revErr } = await supabase.from('reviews').upsert(reviews, { onConflict: 'author' });
  if (revErr) console.error('Reviews seed error:', revErr.message);
  else console.log(`✅ ${reviews.length} reviews seeded`);

  // Offers
  const { error: offErr } = await supabase.from('offers').upsert(offers, { onConflict: 'title' });
  if (offErr) console.error('Offers seed error:', offErr.message);
  else console.log(`✅ ${offers.length} offers seeded`);

  // Theme
  const { error: themeErr } = await supabase.from('theme_settings').upsert([themeSettings]);
  if (themeErr) console.error('Theme seed error:', themeErr.message);
  else console.log('✅ Theme settings seeded');

  // Animation
  const { error: animErr } = await supabase.from('animation_settings').upsert([animationSettings]);
  if (animErr) console.error('Animation seed error:', animErr.message);
  else console.log('✅ Animation settings seeded');

  console.log('\n🎉 Seed complete!');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
